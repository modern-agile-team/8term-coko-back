export const EVENT = {
  // 도전과제에서 사용
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
  QUIZ_INCORRECT: 'quiz.incorrect',
  //////////////////////////////////////////

  // hp 깎일때
  HP: {
    DECREASED: 'hp.decreased',
  },
  // 퀴즈 맞혔을때
  QUIZ_CORRECT: 'quiz.correct',
  // 일일퀘스트가 완료됐을 때
  PROGRESS: {
    UPDATED: 'progress.updated',
  },
} as const;
