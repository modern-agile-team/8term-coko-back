import { Query } from '@nestjs/common';

export const EVENT = {
  PART_STATUS: {
    COMPLETED: 'partStatus.completed',
  },
  USER: {
    LEVEL_UP: 'user.levelUp',
  },
  ATTENDANCE: {
    STREAK: 'attendance.streak',
  },
  LEVEL_RANKING: {
    ATTAIN: 'levelRanking.attain',
  },
  POINT_RANKING: {
    ATTAIN: 'pointRanking.attain',
  },
  ATTENDANCE_RANKING: {
    ATTAIN: 'attendanceRanking.attain',
  },
  CORRECT_ANSWER_RANKING: {
    ATTAIN: 'correctAnswerRanking.attain',
  },
  ITEM: {
    BUY: 'item.buy',
  },
  PROGRESS: {
    UPDATED: 'progress.updated',
  },
  HP: {
    DECREASED: 'hp.decreased',
  },
  QUIZ_CORRECT: 'quiz.correct',
  QUIZ_INCORRECT: 'quiz.incorrect',
} as const;
