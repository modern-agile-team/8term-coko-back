interface UserModel {
  id: number;
  name: string;
  level: number;
  experience: number;
  experienceForNextLevel: number;
  point: number;
  totalAttendance: number;
  totalCorrectAnswer: number;
  createdAt: Date;
}

export class UserInfo implements UserModel {
  id: number;
  name: string;
  level: number;
  experience: number;
  experienceForNextLevel: number;
  point: number;
  totalAttendance: number;
  totalCorrectAnswer: number;
  createdAt: Date;
}
