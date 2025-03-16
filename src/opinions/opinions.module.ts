import { Module } from '@nestjs/common';
import { OpinionsController } from './opinions.controller';
import { UserOpinionsController } from './user-opinions.controller';
import { OpinionsService } from './opinions.service';
import { OpinionsRepository } from './opinions.repository';
import { UsersCoreModule } from 'src/users/users-core.module';

@Module({
  imports: [UsersCoreModule],
  controllers: [OpinionsController, UserOpinionsController],
  providers: [OpinionsService, OpinionsRepository],
})
export class OpinionsModule {}
