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
  Query,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengesDto } from './dto/create-challenges.dto';
import { UpdateChallengesDto } from './dto/update-challenges.dto';
import { AuthGuard } from '@nestjs/passport';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ResChallengesDto } from './dto/res-challenges.dto';
import { QueryChallengesDto } from './dto/query-challenges.dto';
import { ResChallengesPaginationDto } from './dto/res-challenges-pagination.dto';
import { ApiChallenges } from './challenges.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('challengess')
@Controller('challengess')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @ApiChallenges.findAll()
  async findAll(@Query() query: QueryChallengesDto) {
    const paginationData =
      await this.challengesService.findAllByPageAndLimit(query);
    return new ResChallengesPaginationDto(paginationData);
  }

  @Get(':challengeId')
  @ApiChallenges.findOne()
  async findOne(@Param('challengeId', PositiveIntPipe) challengeId: number) {
    const challenges = await this.challengesService.findOne(challengeId);
    return new ResChallengesDto(challenges);
  }

  @Post()
  @ApiChallenges.create()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() body: CreateChallengesDto) {
    await this.challengesService.create(body);
  }

  @Patch(':challengeId')
  @ApiChallenges.update()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async update(
    @Param('challengeId', PositiveIntPipe) challengeId: number,
    @Body() body: UpdateChallengesDto,
  ) {
    await this.challengesService.update(challengeId, body);
  }

  @Delete(':challengeId')
  @ApiChallenges.remove()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async remove(@Param('challengeId', PositiveIntPipe) challengeId: number) {
    await this.challengesService.remove(challengeId);
  }
}
