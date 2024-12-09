export class ResProgressDto {
  readonly totalQuizCount: number;
  readonly totalUserProgressCount: number;
  readonly correctUserProgressCount: number;
  readonly inCorrectUserProgressCount: number;

  constructor(progress: ResProgressDto) {
    this.totalQuizCount = progress.totalQuizCount;
    this.totalUserProgressCount = progress.totalUserProgressCount;
    this.correctUserProgressCount = progress.correctUserProgressCount;
    this.inCorrectUserProgressCount = progress.inCorrectUserProgressCount;
  }
}
