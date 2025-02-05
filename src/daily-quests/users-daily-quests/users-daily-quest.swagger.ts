import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResUserDailyQuestDto } from './dto/res-user-daily-quest.dto';

export const ApiUserDailyQuest = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저가 진행중인 일일퀘스트 조회',
        description:
          '1. 배열로옴, 나중에 여러개의 일퀘를 받을걸 예상하고 작성함\n' +
          '2. 진행사항 + 진행중인 일퀘를 리턴해줌, 한마디로 참조하는 일퀘까지 join해서 가져옴',
      }),
      ApiResponse({
        status: 200,
        description: '진행사항 + 진행중인 일퀘',
        type: [ResUserDailyQuestDto],
      }),
    );
  },
  update: () => {
    return applyDecorators(
      ApiOperation({
        summary: '일일퀘스트 완료 진행도 수정',
        description:
          '1. 배열로옴, 나중에 여러개의 일퀘를 받을걸 예상하고 작성함\n' +
          '2. 진행사항 + 진행중인 일퀘를 리턴해줌, 한마디로 참조하는 일퀘까지 join해서 가져옴' +
          `3. conditionProgress값을 수정 할 수 있는데, 참조하는 일퀘의 condition 값보다 높아지면
          서버에서 completed 값을 true로 바꿔줌, 반대는 false로 바꿔줌` +
          `completed값 보다 훨씬 큰 값도 들어올 수 있음, 따로 막지는 않는데 최대로 1000만 막겠음`,
      }),
      ApiResponse({
        status: 200,
        description: '진행사항 + 진행중인 일퀘',
        type: [ResUserDailyQuestDto],
      }),
    );
  },
};
