import { Controller, Get, Body, Param, Put, HttpCode } from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ResPartProgressDto } from './dto/res-part-progress.dto';

@Controller('users/:id/part-progress')
export class PartProgressController {
  constructor(private readonly partProgressService: PartProgressService) {}

  @Get()
  async findAll(
    @Param('id', PositiveIntPipe) userId: number,
  ): Promise<ResPartProgressDto[]> {
    const partProgress = await this.partProgressService.findAll(userId);
    return ResPartProgressDto.fromArray(partProgress);
  }

  @Put('parts/:partId')
  @HttpCode(204)
  async createOrUpdate(
    @Param('id', PositiveIntPipe) userId: number,
    @Param('partId', PositiveIntPipe) partId: number,
    @Body() body: CreatePartProgressDto,
  ): Promise<void> {
    await this.partProgressService.createOrUpdate(userId, partId, body);
  }
}
