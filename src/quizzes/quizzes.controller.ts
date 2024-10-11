import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ParamQuizDto } from './dto/param-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly questionsService: QuizzesService) {}

  @Post()
  create(@Body() quizData: CreateQuizDto) {
    return this.questionsService.create(quizData);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':section')
  findSection(@Param() params: ParamQuizDto) {
    const { section } = params;
    return this.questionsService.findSection(section);
  }

  @Get(':section/:part')
  findSectionPart(@Param() params: ParamQuizDto) {
    const { section, part } = params;
    return this.questionsService.findSectionPart(section, part);
  }

  @Get(':section/:part/:id')
  findSectionPartId(@Param() params: ParamQuizDto) {
    const { section, part, id } = params;
    return this.questionsService.findSectionPartId(section, part, id);
  }

  @Put(':id')
  update(@Param() params: ParamQuizDto, @Body() quizData: UpdateQuizDto) {
    const { id } = params;
    return this.questionsService.update(id, quizData);
  }

  @Delete(':id')
  remove(@Param() params: ParamQuizDto) {
    const { id } = params;
    return this.questionsService.remove(id);
  }
}
