import { Injectable } from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResMyMonthlyAttendanceDto } from './dtos/res-monthly-attendance.dto';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  // userId와 date값으로 데이터 조회
  findByUserAndDate(userId: number, date: Date): Promise<Attendance> {
    return this.prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId: userId,
          date: date,
        },
      },
    });
  }

  // 출석 정보 저장
  saveAttendance(userId: number, date: Date): Promise<Attendance> {
    return this.prisma.attendance.create({
      data: {
        userId,
        date: new Date(date),
      },
    });
  }

  // 월간 출석 정보 조회
  findMonthlyAttendance(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ResMyMonthlyAttendanceDto[]> {
    return this.prisma.attendance.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }
}
