import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSectionDto } from './dto/create-section.dto';
import { ResSectionDto } from './dto/res-section.dto';

export const ApiSections = {
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 생성',
      }),
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: CreateSectionDto,
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
        type: ResSectionDto,
        isArray: true,
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
        description:
          '특정 section의 id param값을 통해 id, nmae 값을 조회 또한 id를 참조하는 part객체들을 배열로 보냄',
        type: ResSectionDto,
        content: {
          JSON: {
            example: {
              id: 2,
              name: 'function',
              createdAt: '2024-11-04T10:42:17.052Z',
              updatedAt: '2024-11-04T10:42:17.052Z',
              part: [
                {
                  id: 1,
                  sectionId: 1,
                  name: 'string',
                  createdAt: '2024-11-18T06:50:00.122Z',
                  updatedAt: '2024-11-18T06:50:00.122Z',
                },
                {
                  id: 2,
                  sectionId: 1,
                  name: 'number',
                  createdAt: '2024-11-18T06:50:07.072Z',
                  updatedAt: '2024-11-18T06:50:07.072Z',
                },
              ],
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
  findOneWithStatus: () => {
    return applyDecorators(
      ApiOperation({
        description: `
          section id와 유저 id로 조회
          1. 단일 section 정보 
          2. 관련 part들의 정보 
          3. part내부에 진행도와 관련된 status항목을 추가함
          4. status값이 없으면 유저가 그 파트에 대한 진행도 사항이 undefind인 오류 상황임`,
      }),
      ApiResponse({
        status: 200,
        description:
          '특정 section의 id param값을 통해 id, nmae 값을 조회 또한 id를 참조하는 part객체들을 배열로 보냄',
        content: {
          JSON: {
            example: {
              id: 1,
              name: '변수',
              part: [
                {
                  id: 1,
                  sectionId: 1,
                  name: '변수명',
                  status: 'LOCKED',
                },
                {
                  id: 2,
                  sectionId: 1,
                  name: 'const',
                  status: 'LOCKED',
                },
                {
                  id: 3,
                  sectionId: 1,
                  name: 'let',
                  status: 'LOCKED',
                },
              ],
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
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: CreateSectionDto,
      }),
      ApiResponse({
        status: 204,
        description: '특정 section의 id param값을 통해 nmae 값을 수정',
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
        status: 204,
        description: '특정 section의 id param값을 통해 section 삭제',
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
