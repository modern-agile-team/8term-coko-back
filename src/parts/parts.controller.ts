import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  create(@Body() partData: CreatePartDto) {
    return this.partsService.create(partData);
  }

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.partsService.remove(id);
  }
}
