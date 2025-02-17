import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResChallengePaginationDto } from './dto/res-challenge-pagination.dto';
import { ResChallengeDto } from './dto/res-challenge.dto';

export const ApiChallenge = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모든 도전과제 페이지네이션으로 조회',
        description: 'offset 페이지네이션 구현겸 적용',
      }),
      ApiResponse({
        status: 200,
        description: `페이지네이션 된 도전과제 조회 됨`,
        type: [ResChallengePaginationDto],
      }),
    );
  },
  findOne: () => {
    return applyDecorators(
      ApiOperation({
        summary: '단일 조회',
      }),
      ApiResponse({
        status: 200,
        description: `아이디를 통해 단일 도전과제 조회 됨`,
        type: ResChallengeDto,
      }),
    );
  },
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: '생성',
        description: '생성요청. 벳지이름은 유니크 값임 주의',
      }),
      ApiResponse({
        status: 204,
        description: '새 도전과제가 성공적으로 생성',
      }),
      ApiResponse({
        status: 409,
        description: '벳지이름은 유니크 해야합니다.',
        content: {
          JSON: {
            example: {
              message: '벳지이름은 유니크 해야합니다.',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      }),
    );
  },
  update: () => {
    return applyDecorators(
      ApiOperation({
        summary: '수정',
        description:
          '모든 요청 속성은 옵셔널하게 보낼 수 있음. 뱃지이름 유니크를 체크함',
      }),
      ApiResponse({
        status: 204,
        description: '도전과제를 성공적으로 수정',
      }),
      ApiResponse({
        status: 404,
        description: '도전과제 id를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: '도전과제 12를 찾을 수 없습니다.',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
      ApiResponse({
        status: 409,
        description: '벳지이름은 유니크 해야합니다.',
        content: {
          JSON: {
            example: {
              message: '벳지이름은 유니크 해야합니다.',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      }),
    );
  },
  remove: () => {
    return applyDecorators(
      ApiOperation({
        summary: '삭제',
      }),
      ApiResponse({
        status: 204,
        description: '도전과제가 성공적으로 삭제',
      }),
      ApiResponse({
        status: 404,
        description: '도전과제 id를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: '도전과제 12를 찾을 수 없습니다.',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
    );
  },
};
