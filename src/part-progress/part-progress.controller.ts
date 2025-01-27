import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ResPartProgressDto } from './dto/res-part-progress.dto';
import { ApiPartProgress } from './part-progress.swagger';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('part-progress')
@Controller('users/me/part-progress')
export class PartProgressController {
  constructor(private readonly partProgressService: PartProgressService) {}

  @ApiPartProgress.findAll()
  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo): Promise<ResPartProgressDto[]> {
    const partProgress = await this.partProgressService.findAll(user.id);
    return ResPartProgressDto.fromArray(partProgress);
  }

  @ApiPartProgress.createOrUpdate()
  @Put('parts/:partId')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async createOrUpdate(
    @User() user: UserInfo,
    @Param('partId', PositiveIntPipe) partId: number,
    @Body() body: CreatePartProgressDto,
  ): Promise<void> {
    await this.partProgressService.createOrUpdate(user.id, partId, body);
  }
}
