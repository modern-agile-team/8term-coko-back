import { ValueOf } from 'src/common/util/type-utils';

export const SortValues = {
  POINT: 'point',
  LEVEL: 'level',
} as const;
export type Sort = ValueOf<typeof SortValues>;
