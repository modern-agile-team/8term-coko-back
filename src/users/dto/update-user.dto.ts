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

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @IsOptional()
  @IsNumber()
  readonly experience?: number;

  @IsOptional()
  @IsNumber()
  readonly point?: number;
}
