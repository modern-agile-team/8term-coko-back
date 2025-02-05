import { ValueOf } from 'src/common/util/type-utils';

export const SortValues = {
  LEVEL: 'level',
  POINT: 'point',
  ATTENDANCE: 'attendance',
} as const;
export type Sort = ValueOf<typeof SortValues>;
