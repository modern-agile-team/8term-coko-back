// sse.controller.ts
import { Controller, Sse, Param, Req, UseGuards } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { SseService } from './sse.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/users/users.entity';
import { User } from 'src/common/decorators/get-user.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('accessToken'))
  sse(
    @User() user: UserInfo,
    @Req() request: Request,
  ): Observable<MessageEvent> {
    const userId = user.id;
    const client = new Subject<MessageEvent>();

    // 클라이언트 등록
    this.sseService.addClient(userId, client);

    // 브라우저 닫힘 등으로 연결이 종료될 때 처리
    request.on('close', () => {
      this.sseService.removeClient(userId);
      client.complete();
    });

    return client.asObservable();
  }
}
