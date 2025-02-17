import { ApiProperty } from '@nestjs/swagger';
import {
  UserChallenge,
  UserChallengesAndInfo,
} from '../user-challenges.interface';
import { ResChallengesDto } from 'src/challenges/dto/res-challenges.dto';

export class ResUserChallengesDto
  implements Omit<UserChallenge, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1, description: '유저도전과제 아이디' })
  readonly id: number;

  @ApiProperty({ example: 1, description: '유저 아이디' })
  readonly userId: number;

  @ApiProperty({ example: 1, description: '도전과제 아이디' })
  readonly challengeId: number;

  @ApiProperty({
    example: false,
    description: '도전과제 완료 여부',
  })
  readonly completed: boolean;

  @ApiProperty({
    example: 0,
    description: '도전과제 완료한 시간',
  })
  readonly completedDate: Date | null;

  @ApiProperty({
    description: '도전과제',
    type: ResChallengesDto,
  })
  readonly challenge: ResChallengesDto;

  constructor(userChallenges: UserChallengesAndInfo) {
    this.id = userChallenges.id;
    this.userId = userChallenges.userId;
    this.challengeId = userChallenges.challengeId;
    this.completed = userChallenges.completed;
    this.completedDate = userChallenges.completedDate;
    this.challenge = new ResChallengesDto(userChallenges.challenge);
  }

  static fromArray(
    userChallengess: UserChallengesAndInfo[],
  ): ResUserChallengesDto[] {
    return userChallengess.map(
      (userChallenges) => new ResUserChallengesDto(userChallenges),
    );
  }
}
