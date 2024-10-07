// model Users{
//     id Int @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     nickname String
//     profileImage String?
//     maxHealthPoint Int?
//     lastLogin DateTime?
//     level Int?
//     experience Int?
//     point Int?
//   }

import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;
}
