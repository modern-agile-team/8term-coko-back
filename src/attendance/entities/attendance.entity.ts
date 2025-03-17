interface AttendanceModel {
  id: number;
  userId: number;
  date: Date;
  createdAt: Date;
}

export class Attendance implements AttendanceModel {
  id: number;
  userId: number;
  date: Date;
  createdAt: Date;
}
