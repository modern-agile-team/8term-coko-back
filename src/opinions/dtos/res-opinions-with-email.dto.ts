import { ApiProperty } from '@nestjs/swagger';
import { ResMyOpinionsDto } from './res-my-opinions.dto';

export class ResOpinionsWithEmailDto extends ResMyOpinionsDto {
  @ApiProperty({
    description: '유저 email',
    example: 'gwgw123@gmail.com',
  })
  email: string;
}
