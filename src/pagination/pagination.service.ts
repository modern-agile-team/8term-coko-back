import { Injectable } from '@nestjs/common';
import { PaginatedResult } from './pagination.interface';

@Injectable()
export class PaginationService {
  paginateByOrder<T extends { order: number }>(
    items: T[],
    pageSize: number,
  ): PaginatedResult<T> {
    const hasNextPage = items.length > pageSize;
    const data = hasNextPage ? items.slice(0, -1) : items; // 마지막 데이터 제거
    const nextCursor = hasNextPage ? data[data.length - 1].order : null;

    return {
      data,
      nextCursor,
      hasNextPage,
    };
  }
}
