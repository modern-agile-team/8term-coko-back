import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserChallengeService } from './user-challenge.service';
import { CreateUserChallengeDto } from './dto/create-user-challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user-challenge.dto';

@Controller('user-challenge')
export class UserChallengeController {
  constructor(private readonly userChallengeService: UserChallengeService) {}

  @Get()
  findAll() {
    return this.userChallengeService.findAll();
  }
}
