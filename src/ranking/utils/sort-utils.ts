export function createOrderBy(sort: string): object[] {
  if (sort === 'point') {
    return [{ point: 'desc' }, { level: 'desc' }, { experience: 'desc' }];
  }

  if (sort === 'level') {
    return [{ level: 'desc' }, { experience: 'desc' }];
  }
}
