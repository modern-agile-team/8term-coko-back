import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUserChallengesDto {
  @ApiProperty({
    description: '줄 포인트',
    example: 0,
  })
  @IsInt()
  readonly userId: number;

  @ApiProperty({
    description: '줄 포인트',
    example: 0,
  })
  @IsInt()
  readonly challengeId: number;
}
