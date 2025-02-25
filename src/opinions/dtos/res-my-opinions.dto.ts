import { ApiProperty } from '@nestjs/swagger';

export class ResMyOpinionsDto {
  @ApiProperty({
    description: '문의 id',
    example: 2,
  })
  readonly id: number;

  @ApiProperty({
    description: '유저 id',
    example: 2,
  })
  readonly userId: number;

  @ApiProperty({
    description: '문의 제목',
    example: '코코 아이템 문의',
  })
  readonly title: string;

  @ApiProperty({
    description: '문의 내용',
    example: '코코가 신을 신발을 만들어주세요',
  })
  readonly content: string;

  @ApiProperty({
    description: '문의한 시간',
    example: '2025-02-20 10:41:01.673',
  })
  readonly createdAt: Date;

  constructor(props: ResMyOpinionsDto) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }
  static fromArray(props: ResMyOpinionsDto[]): ResMyOpinionsDto[] {
    return props.map((myOpinions) => new ResMyOpinionsDto(myOpinions));
  }
}
