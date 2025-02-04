import { ConflictException, Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { ResMyMonthlyAttendanceDto } from './dtos/res-monthly-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  /**
   * 출석체크 요청
   */
  async attend(userId: number) {
    const now = new Date(); // 현재 시스템의 기본 시간
    const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환

    const today = new Date(
      nowKST.getFullYear(),
      nowKST.getMonth(),
      nowKST.getDate(),
      0,
      0,
      0,
    );

    // 이미 출석 되어 있는지
    const alreadyChecked = await this.attendanceRepository.findByUserAndDate(
      userId,
      today,
    );

    if (alreadyChecked) {
      throw new ConflictException();
    }

    return await this.attendanceRepository.saveAttendance(userId, today);
  }

  /**
   * 당일 출석 여부 확인
   */
  async checkTodayAttendance(userId: number) {
    const now = new Date(); // 현재 시스템의 기본 시간
    const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환

    const today = new Date(
      Date.UTC(nowKST.getFullYear(), nowKST.getMonth(), nowKST.getDate(), 0),
    );

    const todayAttendance = await this.attendanceRepository.findByUserAndDate(
      userId,
      nowKST,
    );

    return !!todayAttendance; // 출석 데이터가 있으면 true, 없으면 false
  }

  /**
   * 월간 출석정보 조회
   */
  async findMonthAttendance(userId: number, year: string, month: string) {
    const startDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
    const endDate = new Date(`${year}-${month.toString().padStart(2, '0')}-31`);

    const monthlyAttendance =
      await this.attendanceRepository.findMonthlyAttendance(
        userId,
        startDate,
        endDate,
      );

    return ResMyMonthlyAttendanceDto.fromArray(monthlyAttendance);
  }
}
