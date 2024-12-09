import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
//스웨거에  파트참조 하는 문제 있다고 써야함
export const ApiParts = {
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 생성',
      }),
      ApiResponse({
        status: 204,
        description: 'sections가 성공적으로 생성됨',
      }),
      ApiResponse({
        status: 400,
        description: 'name이 string 이 아님',
        content: {
          JSON: {
            example: {
              message: ['name must be a string'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: '사용하지 않는 속성을 body에 넣은듯 (ex: "test: 2")',
        content: {
          JSON: {
            example: {
              message: [
                'property test should not exist',
                'name must be a string',
              ],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 409,
        description: 'part의 name속성은 유니크 입니다.',
        content: {
          JSON: {
            example: {
              message: 'part의 이름은 유니크 해야합니다.',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      }),
    );
  },
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제파트의 종류 전체 조회',
      }),
      ApiResponse({
        status: 200,
        description: '파트의 id, 상위섹션 id, 파트의 name을 전체 조회함',
        content: {
          JSON: {
            example: [
              {
                id: 1,
                sectionId: 1,
                name: 'argument',
                createdAt: '2024-10-31T08:31:03.580Z',
                updatedAt: '2024-10-31T08:31:03.580Z',
              },
            ],
          },
        },
      }),
    );
  },
  remove: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제파트 단일 삭제',
      }),
      ApiResponse({
        status: 200,
        description: '특정 파트의 id param값을 통해 단일 파트 삭제',
        content: {
          JSON: {
            example: {
              id: 1,
              sectionId: 1,
              name: 'argument',
              createdAt: '2024-10-31T08:31:03.580Z',
              updatedAt: '2024-10-31T08:31:03.580Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '파트의 id 값을 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: '파트의 id 값이 양수가 아님',
        content: {
          JSON: {
            example: {
              message: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: '파트의 id 값이 정수가 아님',
        content: {
          JSON: {
            example: {
              message: 'Validation failed (numeric string is expected)',
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 409,
        description: '파트를 참조하고 있는 문제가 있어 삭제를 거부함',
        content: {
          JSON: {
            example: {
              message: '파트를 참조하고 있는 문제가 있음',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      }),
    );
  },
};
