interface PartProgressModel {
  userId: number;
  partId: number;
  status: PartStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const PartStatus = {
  LOCKED: 'LOCKED',
  STARTED: 'STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export type PartStatus = (typeof PartStatus)[keyof typeof PartStatus];

export class PartProgress implements PartProgressModel {
  userId: number;
  partId: number;
  status: PartStatus;
  createdAt: Date;
  updatedAt: Date;
}
