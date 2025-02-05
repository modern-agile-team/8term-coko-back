import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResMyMonthlyAttendanceDto } from './dtos/res-monthly-attendance.dto';

export const ApiAttendance = {
  attend: () => {
    return applyDecorators(
      ApiOperation({
        summary: '출석체크 요청',
      }),
      ApiResponse({
        status: 201,
        description: `출석체크 성공`,
      }),
      ApiResponse({
        status: 409,
        description: `출석체크가 되어 있음`,
      }),
    );
  },
  checkTodayAttendance: () => {
    return applyDecorators(
      ApiOperation({
        summary: '당일 출석체크 확인',
      }),
      ApiResponse({
        status: 200,
        description: `성공적으로 확인`,
      }),
    );
  },
  findMonthAttendance: () => {
    return applyDecorators(
      ApiOperation({
        summary: '나의 월간 출석체크 정보 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `성공적으로 출석체크 정보를 가져옴`,
        type: [ResMyMonthlyAttendanceDto],
      }),
    );
  },
};
