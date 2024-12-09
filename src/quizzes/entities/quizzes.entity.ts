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

export const Category = {
  COMBINATION: 'COMBINATION',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  OX_SELECTOR: 'OX_SELECTOR',
  SHORT_ANSWER: 'SHORT_ANSWER',
} as const;

export type Category = (typeof Category)[keyof typeof Category];

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
