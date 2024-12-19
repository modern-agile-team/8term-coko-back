import { ValueOf } from 'src/common/util/type-utils';

interface PartProgressModel {
  userId: number;
  partId: number;
  status: PartStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PartStatusValues = {
  LOCKED: 'LOCKED',
  STARTED: 'STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;
export type PartStatus = ValueOf<typeof PartStatusValues>;

export class PartProgress implements PartProgressModel {
  userId: number;
  partId: number;
  status: PartStatus;
  createdAt: Date;
  updatedAt: Date;
}
