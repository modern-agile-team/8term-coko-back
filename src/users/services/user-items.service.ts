import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipUseritemDto } from '../dtos/equip-useritem.dto';
import { UserItemsPaginationQueryDto } from '../dtos/userItems-pagination-query.dto';
import { UserItemsRepository } from '../repositories/user-items.repository';
import { UserItemsPaginationResponseDto } from '../dtos/response-userItems-pagination.dto';
import { UserItem } from '../entities/user-item.entity';
import { Item } from 'src/items/entities/item.entity';
import { UserItemsQueryDto } from '../dtos/userItems-query.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT } from 'src/challenges/const/challenges.constant';
import { ResponseUserItemDto } from '../dtos/response-useritem.dto';

@Injectable()
export class UserItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userItemsRepository: UserItemsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getUserItemsByCategory(
    userId: number,
    query: UserItemsPaginationQueryDto,
  ): Promise<UserItemsPaginationResponseDto> {
    const { mainCategoryId, subCategoryId, page, limit } = query;

    if (
      mainCategoryId &&
      !(await this.userItemsRepository.existMainCategory(mainCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 메인 카테고리입니다: ${mainCategoryId}`,
      );
    }
    if (
      subCategoryId &&
      !(await this.userItemsRepository.existSubCategory(subCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 서브 카테고리입니다: ${subCategoryId}`,
      );
    }

    const where = {
      userId,
      ...(mainCategoryId && { mainCategoryId }),
      ...(subCategoryId && { subCategoryId }),
    };

    const contents = await this.userItemsRepository.findUserItems(
      page,
      limit,
      where,
    );

    const totalCount = await this.prisma.userItem.count({
      where: {
        userId,
        item: {
          ...(mainCategoryId && { mainCategoryId }),
          ...(subCategoryId && { subCategoryId }),
        },
      },
    });

    return new UserItemsPaginationResponseDto({
      totalCount,
      currentPage: page,
      limit,
      contents,
    });
  }

  async getUserItems(userId: number) {
    const userItems = await this.prisma.userItem.findMany({
      where: { userId },
      include: {
        item: {
          include: {
            mainCategory: true,
            subCategory: true,
          },
        },
      },
    });
    if (!userItems) {
      throw new NotFoundException('아이템을 찾을 수 없습니다.');
    }
    return userItems.map((userItem) => new ResponseUserItemDto(userItem));
  }

  async buyUserItems(
    buyUserItemsDto: BuyUserItemsDto,
    userId: number,
    userPoint: number,
  ): Promise<void> {
    const { itemIds } = buyUserItemsDto;

    const items = await this.prisma.item.findMany({
      where: { id: { in: itemIds } },
      select: { id: true, price: true }, //필요한 부분(id, price)
    });

    const foundItemIds = items.map((item) => item.id);
    const notFoundItems = itemIds.filter((id) => !foundItemIds.includes(id));

    if (notFoundItems.length > 0) {
      throw new NotFoundException(
        `다음 아이템을 찾을 수 없습니다. : ${notFoundItems.join(',')}`,
      );
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    if (userPoint < totalPrice) {
      throw new BadRequestException('포인트가 부족합니다.');
    }

    await this.prisma.$transaction(async (prisma) => {
      const existingItems = await prisma.userItem.findMany({
        where: {
          userId: userId,
          itemId: { in: itemIds },
        },
      });

      if (existingItems.length > 0) {
        const ownedItemIds = existingItems.map((item) => item.itemId);
        const duplicateItems = itemIds.filter((id) =>
          ownedItemIds.includes(id),
        );
        throw new BadRequestException(
          `이미 보유한 아이템입니다.: ${duplicateItems.join(',')}`,
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: { point: { decrement: totalPrice } },
      });

      const userItemsData = itemIds.map((itemId) => ({
        userId,
        itemId,
      }));

      await prisma.userItem.createMany({
        data: userItemsData,
      });
    });

    this.eventEmitter.emit(EVENT.ITEM.BUY, { userId });
  }

  async updateItemEquipStatus(
    equipUseritemDto: EquipUseritemDto,
    userId: number,
  ): Promise<void> {
    const { itemIds, isEquipped } = equipUseritemDto;

    await this.prisma.$transaction(async (prisma) => {
      const userItems = await prisma.userItem.findMany({
        where: {
          userId,
          itemId: { in: itemIds },
        },
        include: {
          item: {
            include: {
              mainCategory: true,
              subCategory: true,
            },
          },
        },
      });

      if (!userItems || userItems.length === 0) {
        throw new NotFoundException('아이템을 찾을 수 없습니다.');
      }

      if (isEquipped) {
        const itemsToUnequip = new Set<number>();

        const mainCategoryItems = new Map<number, number[]>();
        const subCategoryItems = new Map<number, number[]>();

        for (const userItem of userItems) {
          const { mainCategory, subCategory } = userItem.item;

          if (!subCategory) {
            if (!mainCategoryItems.has(mainCategory.id)) {
              mainCategoryItems.set(mainCategory.id, []);
            }
            mainCategoryItems.get(mainCategory.id)!.push(userItem.itemId);

            if (mainCategoryItems.get(mainCategory.id)!.length > 1) {
              throw new BadRequestException(
                `메인 카테고리 "${mainCategory.name}"에서는 하나의 아이템만 선택 가능합니다.`,
              );
            }
          } else {
            if (!subCategoryItems.has(subCategory.id)) {
              subCategoryItems.set(subCategory.id, []);
            }
            subCategoryItems.get(subCategory.id)!.push(userItem.itemId);

            if (subCategoryItems.get(subCategory.id)!.length > 1) {
              throw new BadRequestException(
                `서브 카테고리 "${subCategory.name}"에서는 하나의 아이템만 선택 가능합니다.`,
              );
            }
          }
        }

        const equippedItems = await prisma.userItem.findMany({
          where: {
            userId,
            isEquipped: true,
            NOT: {
              itemId: { in: itemIds },
            },
          },
          include: {
            item: {
              include: {
                mainCategory: true,
                subCategory: true,
              },
            },
          },
        });

        for (const equipped of equippedItems) {
          const { mainCategory, subCategory } = equipped.item;
          if (!subCategory) {
            if (mainCategoryItems.has(mainCategory.id)) {
              itemsToUnequip.add(equipped.itemId);
            }
          } else {
            if (subCategoryItems.has(subCategory.id)) {
              itemsToUnequip.add(equipped.itemId);
            }
          }
        }

        if (itemsToUnequip.size > 0) {
          await prisma.userItem.updateMany({
            where: {
              userId,
              itemId: { in: Array.from(itemsToUnequip) },
            },
            data: { isEquipped: false },
          });
        }
      }

      await prisma.userItem.updateMany({
        where: {
          userId,
          itemId: { in: itemIds },
        },
        data: { isEquipped },
      });
    });
  }

  async getEquippedUserItems(
    userId: number,
    query: UserItemsQueryDto,
  ): Promise<UserItem[]> {
    const mainCategoryId = query.mainCategoryId ?? null;
    const subCategoryId = query.subCategoryId ?? null;

    if (
      mainCategoryId &&
      !(await this.userItemsRepository.existMainCategory(mainCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 메인 카테고리입니다: ${mainCategoryId}`,
      );
    }
    if (
      subCategoryId &&
      !(await this.userItemsRepository.existSubCategory(subCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 서브 카테고리입니다: ${subCategoryId}`,
      );
    }

    const where = {
      userId,
      isEquipped: true,
      ...(mainCategoryId && { mainCategoryId }),
      ...(subCategoryId && { subCategoryId }),
    };

    const userItems =
      await this.userItemsRepository.findEquippedUserItems(where);

    return userItems;
  }
  async resetEquipment(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    await this.prisma.userItem.updateMany({
      where: { userId, isEquipped: true },
      data: {
        isEquipped: false,
      },
    });
  }
}
