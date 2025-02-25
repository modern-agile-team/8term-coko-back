import { ValueOf } from 'src/common/util/type-utils';

export const SortValues = {
  LEVEL: 'level',
  POINT: 'point',
  TOTAL_ATTENDANCE: 'totalAttendance',
  TOTAL_CORRECT_ANSWER: 'totalCorrectAnswer',
} as const;
export type Sort = ValueOf<typeof SortValues>;
