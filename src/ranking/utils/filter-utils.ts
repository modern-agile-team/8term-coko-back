import { UserInfo } from 'src/users/entities/user.entity';

/**
 * 나의 랭킹 조회시 사용하는 함수,
 * 윗 등수 유저 수를 탐색할 조건을 만들어줌
 * @param sort
 * @param user
 * @returns
 */
export function createFilterType(sort: string, user: UserInfo): object {
  if (sort === 'level') {
    return {
      OR: [
        { level: { gt: user.level } },
        {
          AND: [{ level: user.level }, { experience: { gt: user.experience } }],
        },
        {
          AND: [
            { level: user.level },
            { experience: user.experience },
            { totalCorrectAnswer: { gt: user.totalCorrectAnswer } },
          ],
        },
      ],
    };
  }

  if (sort === 'point') {
    return {
      OR: [
        { point: { gt: user.point } },
        {
          AND: [{ point: user.point }, { level: { gt: user.level } }],
        },
        {
          AND: [
            { point: user.point },
            { level: user.level },
            { experience: { gt: user.experience } },
          ],
        },
      ],
    };
  }

  if (sort === 'totalAttendance') {
    return {
      OR: [
        { totalAttendance: { gt: user.totalAttendance } },
        {
          AND: [
            { totalAttendance: user.totalAttendance },
            { level: { gt: user.level } },
          ],
        },
        {
          AND: [
            { totalAttendance: user.totalAttendance },
            { level: user.level },
            { experience: { gt: user.experience } },
          ],
        },
      ],
    };
  }

  if (sort === 'totalCorrectAnswer') {
    return {
      OR: [
        { totalCorrectAnswer: { gt: user.totalCorrectAnswer } },
        {
          AND: [
            { totalCorrectAnswer: user.totalCorrectAnswer },
            { level: { gt: user.level } },
          ],
        },
        {
          AND: [
            { totalCorrectAnswer: user.totalCorrectAnswer },
            { level: user.level },
            { experience: { gt: user.experience } },
          ],
        },
      ],
    };
  }
}
