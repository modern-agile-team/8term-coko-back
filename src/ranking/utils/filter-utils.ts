export function createFilterType(sort: string, user: any): object {
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

  if (sort === 'level') {
    return {
      OR: [
        { level: { gt: user.level } },
        {
          AND: [{ level: user.level }, { experience: { gt: user.experience } }],
        },
      ],
    };
  }
}
