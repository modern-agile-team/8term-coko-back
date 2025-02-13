import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemsPaginationResponseDto } from "./dto/items-pagination-response.dto";

@Injectable()
export class ItemsRepository {
    constructor(private readonly prisma: PrismaService) {}

    
    async getTotalItemsCount(): Promise<number> {
        return await this.prisma.item.count();
    }

    async findSelectedPageItems(page: number, limit: number): Promise<ItemsPaginationResponseDto> {
        const results = await this.prisma.item.findMany({
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                mainCategoryId: {
                    
                        id: true,
                        name: true,
                },
                subCategoryId?: {
                    
                        id: true,
                        name: true,
                ,
                }
            },
        });

        return results;
        
    }
}
