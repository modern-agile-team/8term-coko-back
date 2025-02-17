import { ApiProperty } from '@nestjs/swagger';
import { Challenge } from '../challenge.interface';

export class ResChallengeDto
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
    example: 0,
    description: '도전과제 클리어를 위한 목표, 기본적으로 0 필요시 사용위함',
  })
  readonly condition: number;

  @ApiProperty({
    example: '섹션1클리어',
    description: '도전과제 달성시 얻는 벳지 이름',
  })
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
