import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUserAndDate(userId: number, date: Date) {
    return this.prisma.attendance.findFirst({
      where: { userId, date },
    });
  }

  saveAttendance(userId: number, date: Date) {
    return this.prisma.attendance.create({
      data: {
        userId,
        date: new Date(date),
      },
    });
  }

  findMonthlyAttendance(userId: number, startDate: Date, endDate: Date) {
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
