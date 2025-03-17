import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { DailyQuest } from '../daily-quests.interface';

export class CreateDailyQuestDto
  implements Omit<DailyQuest, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: '내용',
    example: '문제 5개를 푸세요',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: '보상 포인트수치',
    example: 1000,
  })
  @IsInt()
  @Min(0)
  readonly point: number;

  @ApiProperty({
    description: '보상 경험치수치',
    example: 100,
  })
  @IsInt()
  @Min(0)
  readonly experience: number;

  @ApiProperty({
    description: '달성조건',
    example: 5,
  })
  @IsInt()
  @Min(0)
  readonly condition: number;
}
