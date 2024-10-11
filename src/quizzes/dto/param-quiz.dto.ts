import { Part } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ParamQuizDto {
  @IsString()
  readonly section?: string;

  @IsEnum(Part, { message: '잘못된 part value' })
  readonly part?: Part;

  @IsNumber()
  readonly id?: number;
}
