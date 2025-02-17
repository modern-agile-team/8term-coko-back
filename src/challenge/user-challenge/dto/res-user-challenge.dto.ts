import { ApiProperty } from '@nestjs/swagger';
import {
  UserChallenge,
  UserChallengeAndInfo,
} from '../user-challenge.interface';
import { ResChallengeDto } from 'src/challenge/dto/res-challenge.dto';

export class ResUserChallengeDto
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
    example: 0,
    description: '도전과제 완료한 시간',
    type: ResChallengeDto,
  })
  readonly challenge: ResChallengeDto;

  constructor(userChallenge: UserChallengeAndInfo) {
    this.id = userChallenge.id;
    this.userId = userChallenge.userId;
    this.challengeId = userChallenge.challengeId;
    this.completed = userChallenge.completed;
    this.completedDate = userChallenge.completedDate;
    this.challenge = new ResChallengeDto(userChallenge.challenge);
  }

  static fromArray(
    userChallenges: UserChallengeAndInfo[],
  ): ResUserChallengeDto[] {
    return userChallenges.map(
      (userChallenge) => new ResUserChallengeDto(userChallenge),
    );
  }
}
