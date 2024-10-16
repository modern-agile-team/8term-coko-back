//service : 비즈니스 로직. 아이템 목록을 데이터베이스에서 가져오는 역할 -> 실제 데이터를 불러온다

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.

@Injectable() //클래스 : 의존성 주입 가능한 (다른 곳에서 이 클래스를 불러와서 사용할 수 있게 한다.)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //모든 아이템 목록을 조회하는 메서드 getAllItems
  async getAllItems() {
    return await this.prisma.items.findMany(); //prisma를 통해 db에서 모든 아이템(항목) 조회 : findMany()
  }
}
