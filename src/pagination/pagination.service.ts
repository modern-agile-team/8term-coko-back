import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  paginate<T>(
    items: T[],
    pageSize: number,
  ): { data: T[]; nextCursor: number | null; hasNextPage: boolean } {
    const hasNextPage = items.length > pageSize;
    const data = hasNextPage ? items.slice(0, -1) : items; // 마지막 추가된 데이터 제거
    const nextCursor = hasNextPage ? (items[items.length - 1] as any).id : null;

    return {
      data,
      nextCursor,
      hasNextPage,
    };
  }
}
