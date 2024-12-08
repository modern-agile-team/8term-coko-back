import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiParts } from './parts.swagger';
import { ResPartDto } from './dto/res-part.part.dto';

@ApiTags('parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @ApiParts.findAll()
  @Get()
  async findAll() {
    const parts = await this.partsService.findAll();
    return ResPartDto.fromArray(parts);
  }

  @ApiParts.create()
  @Post()
  @HttpCode(204)
  async create(@Body() createPartDto: CreatePartDto): Promise<void> {
    await this.partsService.create(createPartDto);
  }

  @ApiParts.remove()
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', PositiveIntPipe) id: number): Promise<void> {
    await this.partsService.remove(id);
  }
}
