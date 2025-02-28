import { ApiProperty } from '@nestjs/swagger';
import { Challenge } from '../challenges.interface';
import { ChallengeTypeValues } from '../const/challenges.constant';
import { ChallengeType } from '../user-challenges/user-challenges.interface';

export class ResChallengesDto
  implements Omit<Challenge, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1, description: '도전과제 아이디' })
  readonly id: number;

  @ApiProperty({
    example: '첫번째 섹션을 클리어 하세요',
    description: '도전과제 내용',
  })
  readonly content: string;

  @ApiProperty({
    example: 0,
    description: '도전과제 클리어시 줄 포인트, 기본적으로 0',
  })
  readonly point: number;

  @ApiProperty({
    example: 0,
    description: '도전과제 클리어시 줄 경험치, 기본적으로 0',
  })
  readonly experience: number;

  @ApiProperty({
    description: '도전과제 타입',
    example: ChallengeTypeValues.LEVEL_CLEAR,
    enum: ChallengeTypeValues,
  })
  readonly challengeType: ChallengeType;

  @ApiProperty({
    example: 0,
    description: '도전과제 클리어를 위한 목표, 기본적으로 0 필요시 사용위함',
  })
  readonly condition: number;

  @ApiProperty({
    example: '섹션1클리어',
    description: '도전과제 달성시 얻는 벳지 이름',
  })
  readonly badgeName: string;

  constructor(challenges: Challenge) {
    this.id = challenges.id;
    this.content = challenges.content;
    this.point = challenges.point;
    this.experience = challenges.experience;
    this.challengeType = challenges.challengeType;
    this.condition = challenges.condition;
    this.badgeName = challenges.badgeName;
  }

  static fromArray(challenges: Challenge[]): ResChallengesDto[] {
    return challenges.map((challenge) => new ResChallengesDto(challenge));
  }
}
