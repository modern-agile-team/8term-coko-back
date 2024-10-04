import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Body('partId') partId: string,
    @Body('sectionId') sectionId: string,
    @Body('title') title: string,
    @Body('question') question: string,
    @Body('view') view: string,
    @Body('answer') answer: string,
    @Body('category') category: string,
  ) {
    return this.questionsService.create(
      +partId,
      +sectionId,
      title,
      question,
      view,
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    //@Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
