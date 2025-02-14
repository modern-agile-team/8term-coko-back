import { ApiProperty } from '@nestjs/swagger';

export class ResChallengeDto
  implements Omit<Challenge, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: '첫번째 섹션을 클리어 하세요' })
  readonly content: string;

  @ApiProperty({ example: 0 })
  readonly point: number;

  @ApiProperty({ example: 0 })
  readonly experience: number;

  @ApiProperty({ example: 0 })
  readonly condition: number;

  @ApiProperty({ example: '섹션1클리어' })
  readonly badgeName: string;

  constructor(challenge: Challenge) {
    this.id = challenge.id;
    this.content = challenge.content;
    this.point = challenge.point;
    this.experience = challenge.experience;
    this.condition = challenge.condition;
    this.badgeName = challenge.badgeName;
  }

  static fromArray(challenges: Challenge[]): ResChallengeDto[] {
    return challenges.map((challenge) => new ResChallengeDto(challenge));
  }
}
