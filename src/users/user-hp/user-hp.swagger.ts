import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResUserHpDto } from './dtos/res-user-hp.dto';
import { HP_DECREASE_VALUE, HP_REFILL_TIME } from '../user-hp/user-hp.constant';

export const ApiUserHp = {
  getUserHp: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '인증된 유저의 hp정보 조회',
        description: ' 유저 id, 유저 hp, 유저 hpStorage(최대 hp통)를 보여줌',
      }),
      ApiResponse({
        status: 200,
        description: `
          유저 id, 유저 hp, 유저 hpStorage(최대 hp통)를 보여줌
        `,
        type: ResUserHpDto,
      }),
    );
  },
  dcreaseUserHp: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: 'hp 감소 요청',
        description: `
        1. 유저의 hp를 ${HP_DECREASE_VALUE} 감소 시킴
        2. 해당 api의 마지막 요청을 기준으로 ${HP_REFILL_TIME / 60 / 1000}분 이 지나면
           hp.decreased 이벤트의 함수가 실행되면서 hp가 가득 차고 알림 응답을 함
        `,
      }),
      ApiResponse({
        status: 200,
        description:
          '수정이 완료되면 유저 id와 수정된 유저 hp, 유저 hpStorage(최대 hp통)를 보여줌',
        type: ResUserHpDto,
      }),
    );
  },
};
