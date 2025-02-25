import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePartDto } from './dto/create-part.dto';
import { ResPartDto } from './dto/res-part.dto';
import { UpdatePartOrderDto } from './dto/update-part-order.dto';

export const ApiParts = {
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: '생성',
      }),
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: CreatePartDto,
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
        summary: '모든 파트 조회',
      }),
      ApiResponse({
        status: 200,
        description: '파트의 id, 상위섹션 id, 파트의 name을 전체 조회함',
        type: ResPartDto,
        isArray: true,
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
  findOne: () => {
    return applyDecorators(
      ApiOperation({
        summary: '하나 조회',
      }),
      ApiResponse({
        status: 200,
        description: '파트의 id, 상위섹션 id, 파트의 name을 조회함',
        type: ResPartDto,
      }),
    );
  },
  updateAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '이름 또는 섹션id 수정',
        description: 'patch요청 이지만, 두 옵션 모두 필수로 넣어야함 ',
      }),
      ApiBody({
        description: '파트 생성에 필요한 정보',
        type: CreatePartDto,
      }),
      ApiResponse({
        status: 204,
        description:
          '특정 파트의 id param값을 통해 nmae 값과 참조 섹션 id를 수정',
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
    );
  },
  updateOrder: () => {
    return applyDecorators(
      ApiOperation({
        summary: '순서 변경',
        description: '정말 필요하지 않으면 일단은 사용하지 않기... (수정예정)',
      }),
      ApiBody({
        description: '파트 수정에 필요한 order 정보',
        type: UpdatePartOrderDto,
      }),
      ApiResponse({
        status: 204,
        description:
          'order 값이 변경됨, 변경된 순서에 따라서 다른 파트 order도 업데이트 됨',
        type: ResPartDto,
      }),
      ApiResponse({
        status: 404,
        description: '파트이 id 값을 찾을 수 없음',
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
    );
  },
  remove: () => {
    return applyDecorators(
      ApiOperation({
        summary: '삭제',
      }),
      ApiResponse({
        status: 204,
        description: '특정 파트의 id param값을 통해 단일 파트 삭제',
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
