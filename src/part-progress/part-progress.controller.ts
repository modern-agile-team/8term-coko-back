import {
  Controller,
  Get,
  Param,
  HttpCode,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ResPartProgressDto } from './dto/res-part-progress.dto';
import { ApiPartProgress } from './part-progress.swagger';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';

@ApiTags('parts')
@Controller('users/me/parts')
export class PartProgressController {
  constructor(private readonly partProgressService: PartProgressService) {}

  @ApiPartProgress.findAll()
  @Get('status')
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo): Promise<ResPartProgressDto[]> {
    const partProgress = await this.partProgressService.findAll(user.id);
    return ResPartProgressDto.fromArray(partProgress);
  }

  @ApiPartProgress.createOrUpdate()
  @Patch(':partId/status')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async createOrUpdate(
    @User() user: UserInfo,
    @Param('partId', PositiveIntPipe) partId: number,
    @Body() body: CreatePartProgressDto,
  ): Promise<void> {
    await this.partProgressService.createOrUpdate(user.id, partId, body);
  }

  @ApiPartProgress.createOrUpdateCompleted()
  @Patch(':partId/status/completed')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async createOrUpdateCompleted(
    @User() user: UserInfo,
    @Param('partId', PositiveIntPipe) partId: number,
  ): Promise<void> {
    await this.partProgressService.createOrUpdateCompleted(user.id, partId);
  }
}
