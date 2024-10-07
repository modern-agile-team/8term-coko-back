import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-quiz.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
