import { ValueOf } from 'src/common/util/type-utils';

interface QuizModel {
  id: number;
  partId: number;
  title: string;
  question: string;
  answer: string[];
  answerChoice: string[];
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

const CategoryValues = {
  COMBINATION: 'COMBINATION',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  OX_SELECTOR: 'OX_SELECTOR',
  SHORT_ANSWER: 'SHORT_ANSWER',
} as const;
export type Category = ValueOf<typeof CategoryValues>;

export class Quiz implements QuizModel {
  id: number;
  partId: number;
  title: string;
  question: string;
  answer: string[];
  answerChoice: string[];
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
