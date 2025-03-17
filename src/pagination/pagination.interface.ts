export interface PaginatedResult<T> {
  data: T[];
  nextCursor: number | null;
  hasNextPage: boolean;
}
