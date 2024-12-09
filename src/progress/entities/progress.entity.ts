interface ProgressModel {
  userId: number;
  quizId: number;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Progress implements ProgressModel {
  userId: number;
  quizId: number;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
}
