import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly questionsService: QuizzesService) {}

  @Post()
  create(
    @Body('partId') partId: string,
    @Body('sectionId') sectionId: string,
    @Body('title') title: string,
    @Body('question') question: string,
    @Body('answerChoice') answerChoice: string[],
    @Body('answer') answer: string[],
    @Body('category') category: string,
  ) {
    return this.questionsService.create(
      +partId,
      +sectionId,
      title,
      question,
      answerChoice,
      answer,
      category,
    );
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Get(':section')
  findSection(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Get(':section:part:id')
  findPart(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    //@Body() updateQuizDto: UpdateQuizDto
  ) {
    return this.questionsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
