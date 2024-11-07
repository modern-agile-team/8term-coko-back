import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiSections = {
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 생성',
      }),
      ApiResponse({
        status: 201,
        description: 'sections가 성공적으로 생성됨',
        content: {
          JSON: {
            example: {
              id: 2,
              name: 'JSON',
              createdAt: '2024-11-04T10:42:17.052Z',
              updatedAt: '2024-11-04T10:42:17.052Z',
            },
          },
        },
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
    );
  },
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 전체 조회',
      }),
      ApiResponse({
        status: 200,
        description: 'section의 전체 id , name 을 조회함',
        content: {
          JSON: {
            example: [
              {
                id: 1,
                name: 'variable',
                createdAt: '2024-10-31T08:30:54.120Z',
                updatedAt: '2024-10-31T08:30:54.120Z',
              },
              {
                id: 2,
                name: 'function',
                createdAt: '2024-11-04T10:42:17.052Z',
                updatedAt: '2024-11-04T10:42:17.052Z',
              },
              {
                id: 3,
                name: 'JSON',
                createdAt: '2024-11-04T10:52:46.252Z',
                updatedAt: '2024-11-04T10:52:46.252Z',
              },
            ],
          },
        },
      }),
    );
  },
  findOne: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 단일 조회',
      }),
      ApiResponse({
        status: 200,
        description: '특정 section의 id param값을 통해 id, nmae 값을 조회',
        content: {
          JSON: {
            example: {
              id: 2,
              name: 'function',
              createdAt: '2024-11-04T10:42:17.052Z',
              updatedAt: '2024-11-04T10:42:17.052Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'section의 id 값을 찾을 수 없음',
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
        description: 'section의 id 값이 양수가 아님',
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
        description: 'section의 id 값이 정수가 아님',
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
    );
  },
  update: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 단일 속성 수정',
      }),
      ApiResponse({
        status: 200,
        description: '특정 section의 id param값을 통해 nmae 값을 수정',
        content: {
          JSON: {
            example: {
              id: 3,
              name: 'typeof',
              createdAt: '2024-11-04T10:52:46.252Z',
              updatedAt: '2024-11-04T11:22:33.138Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'section의 id 값을 찾을 수 없음',
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
        description: 'section의 id 값이 양수가 아님',
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
        description: 'section의 id 값이 정수가 아님',
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
    );
  },
  remove: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 단일 삭제',
      }),
      ApiResponse({
        status: 200,
        description: '특정 section의 id param값을 통해 section 삭제',
        content: {
          JSON: {
            example: {
              id: 3,
              name: 'typeof',
              createdAt: '2024-11-04T10:52:46.252Z',
              updatedAt: '2024-11-04T11:22:33.138Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'section의 id 값을 찾을 수 없음',
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
        description: 'section의 id 값이 양수가 아님',
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
        description: 'section의 id 값이 정수가 아님',
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
        description: 'section을 참조하고 있는 파트가 있어 삭제를 거부함',
        content: {
          JSON: {
            example: {
              message: '섹션을 참조하고 있는 파트가 있음',
              error: 'Conflict',
              statusCode: 409,
            },
          },
        },
      }),
    );
  },
};
