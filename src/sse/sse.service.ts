// sse.service.ts
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

@Injectable()
export class SseService {
  // 각 사용자별 Subject를 저장합니다.
  private clients = new Map<number, Subject<MessageEvent>>();

  // 사용자가 SSE 연결 시 Subject 등록
  addClient(userId: number, client: Subject<MessageEvent>) {
    this.clients.set(userId, client);
  }

  // 연결 해제 시 Subject 제거
  removeClient(userId: number) {
    this.clients.delete(userId);
  }

  // 특정 사용자에게 메시지를 보냅니다.
  notifyUser(userId: number, data: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.next({ data });
    }
  }
}
