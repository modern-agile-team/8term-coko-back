import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HP_FULL_RECHARGE_TIME } from '../constants/user-experience.constant';
import { ResUserHpDto } from '../dtos/res-user-hp.dto';
import {
  HP_DECREASE_VALUE,
  HP_REFILL_TIME,
} from '../constants/user-hp.constant';

export const ApiUserHp = {
  getUserHp: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '인증된 유저의 hp정보 조회',
        description: ' 유저 id, 유저 hp, 유저 hpStorage(최대 hp통)를 보여줌',
        // 2. GET 요청은 유저hp 리차지의 트리거로 사용됨
        // 3. 유저 생명력 업데이트 후 ${HP_FULL_RECHARGE_TIME / 60 / 1000}분 이 지나면
        //    GET 요청으로 생명력 조회시 생명력이 hpStorage 수치까지 가득참
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
        summary: '유저의 파트에 대한 진행도생성 또는 업데이트',
        description: `
        1. 유저의 hp를 ${HP_DECREASE_VALUE} 감소 시킴
        2. 해당 api의 마지막 요청을 기준으로 ${HP_REFILL_TIME / 60 / 1000}분 이 지나면
           hp.decreased 이벤트의 함수가 실행되면서 hp가 가득 차고 알림 응답을 함
        `,
        // 1. 유저 hp, 유저 hpStorage(최대 hp통)를 수정 할 수 있음
        // 2. 두개의 옵션(hp, hpStorage) 중 하나 이상을 넣으면 됨
        // 3. 두 값은 number 값을 넣어야함
        // 4. 두 값은 min 0
        // 5. hp값은 hpStorage값을 넘을 수 없음
        // 6. 유저 생명력 업데이트 후 ${HP_FULL_RECHARGE_TIME / 60 / 1000}분 이 지나면
        //    GET 요청으로 생명력 조회시 생명력이 hpStorage 수치까지 가득참
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
