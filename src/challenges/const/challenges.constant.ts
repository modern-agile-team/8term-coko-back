/**
 * 도전과제 타입 값들
 */
export const ChallengeTypeValues = {
  SECTION_CLEAR: 'SECTION_CLEAR',
  LEVEL_CLEAR: 'LEVEL_CLEAR',
  ALL_SECTIONS_CLEAR: 'ALL_SECTIONS_CLEAR',
  ATTENDANCE_STREAK: 'ATTENDANCE_STREAK',
  RANKING_ATTAIN: 'RANKING_ATTAIN',
  FIRST_ITEM_PURCHASE: 'FIRST_ITEM_PURCHASE',
  FIRST_WRONG_ANSWER: 'FIRST_WRONG_ANSWER',
  FIRST_404_VISIT: 'FIRST_404_VISIT',
} as const;

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
  RANKING: {
    ATTAIN: 'ranking.attain',
  },
} as const;
