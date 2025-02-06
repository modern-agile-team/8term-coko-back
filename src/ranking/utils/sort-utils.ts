/**
 * 랭킹 페이지의 정보를 어떤 조건으로 가져올지 정해줌
 * @param sort
 * @returns
 */
export function createOrderBy(sort: string): object[] {
  if (sort === 'point') {
    return [{ point: 'desc' }, { level: 'desc' }, { experience: 'desc' }];
  }

  if (sort === 'level') {
    return [{ level: 'desc' }, { experience: 'desc' }];
  }

  if (sort === 'attendance') {
    return [
      { totalAttendance: 'desc' },
      { level: 'desc' },
      { experience: 'desc' },
    ];
  }
}
