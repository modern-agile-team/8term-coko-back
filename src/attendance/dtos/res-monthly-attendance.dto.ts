import { ApiProperty } from '@nestjs/swagger';

export class ResMyMonthlyAttendanceDto {
  @ApiProperty({
    description: '출석체크 일별 고유 id',
    example: 2,
  })
  readonly id: number;

  @ApiProperty({
    description: '출석한 날짜',
    example: '2025-02-03T00:00:00.000Z',
  })
  readonly date: Date;

  constructor(props: ResMyMonthlyAttendanceDto) {
    this.id = props.id;
    this.date = props.date;
  }

  static fromArray(
    resMyMonthlyAttendanceDto: ResMyMonthlyAttendanceDto[],
  ): ResMyMonthlyAttendanceDto[] {
    return resMyMonthlyAttendanceDto.map(
      (monthlyAttendance) => new ResMyMonthlyAttendanceDto(monthlyAttendance),
    );
  }
}
