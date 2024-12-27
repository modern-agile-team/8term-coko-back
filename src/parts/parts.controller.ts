import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiParts } from './parts.swagger';
import { ResPartDto } from './dto/res-part.part.dto';
import { UpdatePartOrderDto } from './dto/update-part-order.dto';

@ApiTags('parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @ApiParts.findAll()
  @Get()
  async findAll(): Promise<ResPartDto[]> {
    const parts = await this.partsService.findAll();
    return ResPartDto.fromArray(parts);
  }

  @ApiParts.create()
  @Post()
  @HttpCode(204)
  async create(@Body() createPartDto: CreatePartDto): Promise<void> {
    await this.partsService.create(createPartDto);
  }

  @ApiParts.updateAll()
  @Patch(':id')
  @HttpCode(204)
  async updateAll(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: CreatePartDto,
  ): Promise<void> {
    await this.partsService.updateAll(id, body);
  }

  @ApiParts.updateOrder()
  @Patch(':id/order')
  @HttpCode(204)
  async updateOrder(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: UpdatePartOrderDto,
  ): Promise<void> {
    await this.partsService.updateOrder(id, body);
  }

  @ApiParts.remove()
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', PositiveIntPipe) id: number): Promise<void> {
    await this.partsService.remove(id);
  }
}
