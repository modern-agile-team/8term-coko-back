import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService], // PrismaService를 제공하는 부분
  exports: [PrismaService], // PrismaService를 다른 모듈에서 사용할 수 있게 export
})
export class PrismaModule {}
