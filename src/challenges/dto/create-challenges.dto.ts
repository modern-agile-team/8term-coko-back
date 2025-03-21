import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { Challenge } from '../challenges.interface';
import { ChallengeTypeValues } from '../const/challenges.constant';
import { ChallengeType } from '../user-challenges/user-challenges.interface';

export class CreateChallengesDto
  implements Omit<Challenge, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: '내용',
    example: '첫번째 섹션을 클리어 하세요',
  })
  @IsString()
  readonly content: string;

  @ApiProperty({
    description: '줄 포인트',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(1000000)
  readonly point: number;

  @ApiProperty({
    description: '줄 경험치',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(1000000)
  readonly experience: number;

  @ApiProperty({
    description: '도전과제 유형',
    example: ChallengeTypeValues.LEVEL_CLEAR,
    enum: ChallengeTypeValues,
  })
  @IsEnum(ChallengeTypeValues, {
    message: 'challengeType형식에 맞게 넣어야 합니다.',
  })
  readonly challengeType: ChallengeType;

  @ApiProperty({
    description: '무언가 세야할때 쓸러는데 빠질 수 도 있을거 같음',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(1000000)
  readonly condition: number;

  @ApiProperty({
    description: '뱃지 네이밍, 이미지이름으로 넣어도됨',
    example: '섹션1클리어',
  })
  @IsString()
  readonly badgeName: string;
}
