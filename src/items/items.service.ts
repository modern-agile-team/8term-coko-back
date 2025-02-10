import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.

@Injectable() //클래스 : 의존성 주입 가능 (다른 곳에서 이 클래스를 불러와서 사용할 수 있게 한다)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //모든 아이템 목록 조회 getAllItems
  getAllItems() {
    return this.prisma.item.findMany(); // findMany() : 모든 아이템(항목) 조회
  }
}
