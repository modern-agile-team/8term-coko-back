import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ResponseUserDto {
  @ApiProperty({ example: 20 })
  readonly id: number;

  @ApiProperty({ example: '이건우' })
  readonly name: string;

  @ApiProperty({ example: 6 })
  readonly level: number;

  @ApiProperty({ example: 128 })
  readonly experience: number;

  @ApiProperty({ example: 150 })
  readonly experienceForNextLevel: number;

  @ApiProperty({ example: 4800 })
  readonly point: number;

  @ApiProperty({ example: 27 })
  readonly totalAttendance: number;

  @ApiProperty({ example: 18 })
  readonly totalCorrectAnswer: number;

  @ApiProperty({ example: '2025-01-22T02:20:18.611Z' })
  readonly createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
    this.totalAttendance = user.totalAttendance;
    this.createdAt = user.createdAt;
    this.totalCorrectAnswer = user.totalCorrectAnswer;
  }
}
