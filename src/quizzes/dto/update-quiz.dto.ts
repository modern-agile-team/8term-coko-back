import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Category } from '@prisma/client';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiProperty({
    description: '자연수 part id 입력',
    example: 1,
  })
  @IsInt()
  @Min(0)
  readonly partId?: number;

  @ApiProperty({
    description: '문제 설명란',
    example: '다음 보기를 보고 문제를 완성하세요',
  })
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: '문제 메인 화면에 보여 줄 실제 문제 내용',
    example: 'const num : number = 6',
  })
  @IsString()
  readonly question?: string;

  @ApiProperty({
    description:
      '객관식 문제 선택 문항 & 조합형 문제의 선택 단어들 & 그 외 선택사항이 없는 문제들은 빈 배열',
    example: ['const', 'num', ':number', '6'],
  })
  @IsString({ each: true })
  readonly answerChoice?: string[];

  @ApiProperty({
    description:
      '실제 문제의 정답 & 조합형: 문제정답의 순서가 맞아야함 & 그 외 문제들은 인덱스 0번 배열값과 같아야함',
    example: ['const', 'num', ':number', '6'],
  })
  @IsString({ each: true })
  readonly answer?: string[];

  @ApiProperty({
    description: `
      문제 유형 , 4가지가 있음 
      1. COMBINATION : 단어 조합형 문제
      2. MULTIPLE_CHOICE : 객관식 4문항 문제
      3. OX_SELECTOR : ox문제
      4. SHORT_ANSWER : 단답형 문제
    `,
    example: 'MULTIPLE_CHOICE',
  })
  @IsEnum(Category, { message: 'bad category value' })
  readonly category?: Category;
}
