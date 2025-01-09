interface UserModel {
  id: number;
  provider: string;
  providerId: string;
  name: string;
  level: number;
  experience: number;
  experienceForNextLevel: number;
  point: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserInfo implements UserModel {
  id: number;
  provider: string;
  providerId: string;
  name: string;
  level: number;
  experience: number;
  experienceForNextLevel: number;
  point: number;
  createdAt: Date;
  updatedAt: Date;
}
