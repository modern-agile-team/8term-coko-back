import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.
import { BuyItemDto, ItemChangeStatusDto } from './dto/change-item-status.dto';

@Injectable() //클래스 : 의존성 주입 가능 (다른 곳에서 이 클래스를 불러와서 사용가능)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //전체 아이템 조회 + 필터링
  async getItems(mainCategoryId?: number, subCategoryId?: number) {
    //필터링 조건
    const items = await this.prisma.item.findMany({
      //items변수 = 아이템 전부 가져오기
      where: {
        ...(mainCategoryId && { mainCategoryId: mainCategoryId as number }), //mainCategoryId가 truthy -> {mainCategoryId: mainCategoryId} 객체 반환 , falsy -> undefined
        ...(subCategoryId && { subCategoryId: subCategoryId as number }), //subCategoryId가 truthy -> {subCategoryId: subCategoryId} 객체 반환, falsy -> undefined
      },
      include: {
        mainCategory: true, //mainCategory 정보도 가져온다
        subCategory: true, //subCategory 정보도 가져온다
      },
    });

    //필터링 된 아이템이 없을 경우
    if (items.length === 0) {
      throw new NotFoundException('Items not found');
    }
    return items;
  }
}
