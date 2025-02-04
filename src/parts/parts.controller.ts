import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiParts } from './parts.swagger';
import { ResPartDto } from './dto/res-part.dto';
import { UpdatePartOrderDto } from './dto/update-part-order.dto';
import { AuthGuard } from '@nestjs/passport';

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
  //@UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() createPartDto: CreatePartDto): Promise<void> {
    await this.partsService.create(createPartDto);
  }

  @ApiParts.updateAll()
  @Patch(':partId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateAll(
    @Param('partId', PositiveIntPipe) partId: number,
    @Body() body: CreatePartDto,
  ): Promise<void> {
    await this.partsService.updateAll(partId, body);
  }

  @ApiParts.updateOrder()
  @Patch(':partId/order')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateOrder(
    @Param('partId', PositiveIntPipe) partId: number,
    @Body() body: UpdatePartOrderDto,
  ): Promise<void> {
    await this.partsService.updateOrder(partId, body);
  }

  @ApiParts.remove()
  @Delete(':partId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async remove(
    @Param('partId', PositiveIntPipe) partId: number,
  ): Promise<void> {
    await this.partsService.remove(partId);
  }
}
