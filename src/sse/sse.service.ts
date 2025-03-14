// sse.service.ts
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Subject } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SseService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  // 각 사용자별 Subject를 저장합니다.
  private clients = new Map<number, Subject<MessageEvent>>();

  // 사용자가 SSE 연결 시 Subject 등록
  addClient(userId: number, client: Subject<MessageEvent>) {
    this.clients.set(userId, client);
    this.logger.log(`User 연결됨: ${userId}`);
  }

  // 연결 해제 시 Subject 제거
  removeClient(userId: number) {
    this.clients.delete(userId);
    this.logger.log(`User 연결끊김: ${userId}`);
  }

  // 특정 사용자에게 메시지를 보냅니다.
  notifyUser(userId: number, data: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.next({ data });
    }
  }
}
