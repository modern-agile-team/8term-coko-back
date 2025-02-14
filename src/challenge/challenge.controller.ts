import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { AuthGuard } from '@nestjs/passport';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ResChallengeDto } from './dto/res-challenge.dto';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  //@ApiChallenge.findAll()
  async findAll() {
    const challenges = await this.challengeService.findAll();
    //return ResChallengeDto.fromArray(challenges);
  }

  @Get(':challengeId')
  //@ApiChallenge.findOne()
  async findOne(@Param('challengeId', PositiveIntPipe) challengeId: number) {
    const challenge = await this.challengeService.findOne(challengeId);
    return new ResChallengeDto(challenge);
  }

  @Post()
  //@ApiChallenge.create()
  @HttpCode(204)
  //@UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() body: CreateChallengeDto) {
    await this.challengeService.create(body);
  }

  @Patch(':challengeId')
  //@ApiChallenge.update()
  @HttpCode(204)
  //@UseGuards(AuthGuard('adminAccessToken'))
  async update(
    @Param('challengeId', PositiveIntPipe) challengeId: number,
    @Body() body: UpdateChallengeDto,
  ) {
    await this.challengeService.update(challengeId, body);
  }

  @Delete(':challengeId')
  //@ApiChallenge.remove()
  @HttpCode(204)
  //@UseGuards(AuthGuard('adminAccessToken'))
  async remove(@Param('challengeId', PositiveIntPipe) challengeId: number) {
    await this.challengeService.remove(challengeId);
  }
}
