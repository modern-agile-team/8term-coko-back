import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiParts } from './parts.swagger';

@ApiTags('parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @ApiParts.create()
  @Post()
  create(@Body() partData: CreatePartDto) {
    return this.partsService.create(partData);
  }

  @ApiParts.findAll()
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @ApiParts.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.partsService.remove(id);
  }
}
