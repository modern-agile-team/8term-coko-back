import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { ApiAttendance } from './attendance.swagger';
import { AttendanceDateDto } from './dtos/attendance-date-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/users/users.entity';
import { User } from 'src/common/decorators/get-user.decorator';
import { ResMyMonthlyAttendanceDto } from './dtos/res-monthly-attendance.dto';

@ApiTags('attendance')
@Controller('users/me/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * 출석체크 요청
   */
  @ApiAttendance.attend()
  @Post()
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async attend(@User() user: UserInfo): Promise<void> {
    await this.attendanceService.attend(user.id);
  }

  /**
   * 당일 출석 여부 확인
   */
  @ApiAttendance.checkTodayAttendance()
  @Get('today')
  @UseGuards(AuthGuard('accessToken'))
  async checkTodayAttendance(@User() user: UserInfo): Promise<boolean> {
    return await this.attendanceService.checkTodayAttendance(user.id);
  }

  /**
   * 월간 출석정보 조회
   */
  @ApiAttendance.findMonthAttendance()
  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async findMonthAttendance(
    @User() user: UserInfo,
    @Query() attendanceDateDto: AttendanceDateDto,
  ): Promise<ResMyMonthlyAttendanceDto[]> {
    const { year, month } = attendanceDateDto;

    return await this.attendanceService.findMonthAttendance(
      user.id,
      year,
      month,
    );
  }
}
