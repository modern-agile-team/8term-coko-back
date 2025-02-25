/**
 * 도전과제 타입 값들
 */
export const ChallengeTypeValues = {
  SECTION_CLEAR: 'SECTION_CLEAR',
  LEVEL_CLEAR: 'LEVEL_CLEAR',
  ALL_SECTIONS_CLEAR: 'ALL_SECTIONS_CLEAR',
  ATTENDANCE_STREAK: 'ATTENDANCE_STREAK',
  RANKING_CHALLENGE: 'RANKING_CHALLENGE',
  FIRST_ITEM_PURCHASE: 'FIRST_ITEM_PURCHASE',
  FIRST_WRONG_ANSWER: 'FIRST_WRONG_ANSWER',
  FIRST_404_VISIT: 'FIRST_404_VISIT',
} as const;

export const Evnet = {
  PartStatus: {
    Completed: 'partStatus.completed',
  },
  User: {
    LevelUp: 'user.levelUp',
  },
} as const;
