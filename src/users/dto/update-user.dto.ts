// model Users{
//   id Int @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   nickname String
//   profileImage String?
//   maxHealthPoint Int @default(5)
//   lastLogin DateTime @default(now())
//   level Int @default(1)
//   experience Int @default(0)
//   point Int @default(0)
// }

import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly nickname: string;

  @IsNumber()
  readonly exprience: number;

  @IsNumber()
  readonly point: number;
}
