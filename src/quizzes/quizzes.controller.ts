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

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly questionsService: QuizzesService) {}

  @Post()
  create(
    @Body('sectionId') sectionId: string,
    @Body('part') part: string,
    @Body('title') title: string,
    @Body('question') question: string,
    @Body('answerChoice') answerChoice: string[],
    @Body('answer') answer: string[],
    @Body('category') category: string,
  ) {
    return this.questionsService.create(
      +sectionId,
      part,
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

  @Get(':section')
  findSection(@Param('section') section: string) {
    return this.questionsService.findSection(section);
  }

  @Get(':section/:part')
  findSectionPart(
    @Param('section') section: string,
    @Param('part') part: string,
  ) {
    return this.questionsService.findSectionPart(section, part);
  }

  @Get(':section/:part/:id')
  findSectionPartId(
    @Param('section') section: string,
    @Param('part') part: string,
    @Param('id') id: string,
  ) {
    return this.questionsService.findSectionPartId(section, part, +id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('sectionId') sectionId: string,
    @Body('part') part: string,
    @Body('title') title: string,
    @Body('question') question: string,
    @Body('answerChoice') answerChoice: string[],
    @Body('answer') answer: string[],
    @Body('category') category: string,
    //@Body() updateQuizDto: UpdateQuizDto
  ) {
    return this.questionsService.update(
      +id,
      +sectionId,
      part,
      title,
      question,
      answerChoice,
      answer,
      category,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
