import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate<T extends { order: number }>(
    items: T[],
    pageSize: number,
  ): { data: T[]; nextCursor: number | null; hasNextPage: boolean } {
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
