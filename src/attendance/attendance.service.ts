import { ConflictException, Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { ResMyMonthlyAttendanceDto } from './dtos/res-monthly-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.reposirory';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT } from 'src/challenges/const/challenges.constant';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 출석체크 요청
   */
  async attend(userId: number) {
    const now = new Date(); // 현재 시스템의 기본 시간
    const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환

    // 당일의 날짜 데이터만으로 변경 (YYYY-MM-DD 00:00:00)
    const today = new Date(
      Date.UTC(
        nowKST.getUTCFullYear(),
        nowKST.getUTCMonth(),
        nowKST.getUTCDate(),
        0,
        0,
        0,
      ),
    );

    // 이미 출석체크 되어 있는지
    const alreadyChecked = await this.attendanceRepository.findByUserAndDate(
      userId,
      today,
    );

    if (alreadyChecked) {
      throw new ConflictException('Attendance has already been checked');
    }

    /**
     * attendance row가 추가되면서 + user의 total_attendance가 증가 해야함
     */
    await this.prisma.$transaction(async (tx) => {
      // attendance row 추가
      await this.attendanceRepository.saveAttendance(userId, today, tx);

      // user의 total_attendance가 증가
      await this.usersRepository.increaseUserTotalAttendance(userId, tx);

      // 연속 출석 도전과제 검사 이벤트 발행
      this.eventEmitter.emit(EVENT.ATTENDANCE.STREAK, {
        userId,
      });
    });
  }

  /**
   * 당일 출석 여부 확인
   */
  async checkTodayAttendance(userId: number): Promise<boolean> {
    const now = new Date(); // 현재 시스템의 기본 시간
    const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환

    // 당일의 날짜 데이터만으로 변경 (YYYY-MM-DD 00:00:00)
    const today = new Date(
      Date.UTC(
        nowKST.getUTCFullYear(),
        nowKST.getUTCMonth(),
        nowKST.getUTCDate(),
        0,
        0,
        0,
      ),
    );

    const todayAttendance = await this.attendanceRepository.findByUserAndDate(
      userId,
      today,
    );

    return !!todayAttendance; // 출석 데이터가 있으면 true, 없으면 false
  }

  /**
   * 월간 출석정보 조회
   */
  async findMonthAttendance(
    userId: number,
    year: string,
    month: string,
  ): Promise<ResMyMonthlyAttendanceDto[]> {
    const startDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
    const endDate = new Date(`${year}-${month.padStart(2, '0')}-31`);

    const monthlyAttendance =
      await this.attendanceRepository.findMonthlyAttendance(
        userId,
        startDate,
        endDate,
      );

    return ResMyMonthlyAttendanceDto.fromArray(monthlyAttendance);
  }
}
