import { Module } from '@nestjs/common';
import { OpinionsController } from './opinions.controller';
import { UserOpinionsController } from './user-opinions.controller';
import { OpinionsService } from './user-opinions.service';
import { OpinionsRepository } from './user-opinions.repository';

@Module({
  imports: [],
  controllers: [OpinionsController, UserOpinionsController],
  providers: [OpinionsService, OpinionsRepository],
})
export class OpinionsModule {}
