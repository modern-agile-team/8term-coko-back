import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResUserDailyQuestDto } from './dto/res-user-daily-quest.dto';

export const ApiUserDailyQuest = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저가 진행중인 일일퀘스트 조회',
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
      }),
      ApiResponse({
        status: 200,
        description: '진행사항 + 진행중인 일퀘',
        type: [ResUserDailyQuestDto],
      }),
    );
  },
};
