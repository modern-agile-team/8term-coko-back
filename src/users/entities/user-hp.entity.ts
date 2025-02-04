interface UserHpModel {
  id: number;
  userId: number;
  hp: number;
  hpStorage: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserHp implements UserHpModel {
  id: number;
  userId: number;
  hp: number;
  hpStorage: number;
  createdAt: Date;
  updatedAt: Date;
}
