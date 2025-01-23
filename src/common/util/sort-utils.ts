export function createOrderBy(sortType: string): object[] {
  if (sortType === 'point') {
    return [{ point: 'desc' }, { level: 'desc' }, { experience: 'desc' }];
  } else if (sortType === 'level') {
    return [{ level: 'desc' }, { experience: 'desc' }];
  }
}
