import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSectionDto } from './dto/create-section.dto';
import { ResSectionDto } from './dto/res-section.dto';
import { UpdateSectionOrderDto } from './dto/update-section-order.dto';
import { ResSectionPartsDto } from './dto/res-section-parts.dto';
import { ResPaginationOfSectionPartsDto } from './dto/res-pagination-of-section-parts.dto';

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
  findOneWithParts: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 단일 조회',
      }),
      ApiResponse({
        status: 200,
        description:
          '특정 section의 id param값을 통해 id, nmae 값을 조회 또한 id를 참조하는 part객체들을 배열로 보냄',
        type: ResSectionPartsDto,
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
        summary: '이번에 복구한 api, 단일 section과 parts',
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
        type: ResSectionPartsDto,
      }),
    );
  },
  findAllPaginatedSectionsWithParts: () => {
    return applyDecorators(
      ApiOperation({
        summary: '페이지네이션이 적용된 section과 관련 part 조회',
        description: `
            1. 페이지네이션을 위해 커서와 페이지 사이즈를 옵셔널하게 받음
            2. 기본적으로 section과 part는 order 로 정렬되서 옴
            3. 페이지네이션도 section의 order값 순서로 옴
            4. 데이터, 다음 커서값, 다음 데이터가 있는지 3가지 정보를 받음
            `,
      }),
      ApiResponse({
        status: 200,
        description:
          '요청한 페이지네이션 정보, 다음 커서값, 다음 페이지의 유뮤를 보내줌',
        type: ResPaginationOfSectionPartsDto,
      }),
    );
  },
  findAllPaginatedSectionsPartsWithStatus: () => {
    return applyDecorators(
      ApiOperation({
        summary:
          '로그인한 유저의 페이지네이션이 적용된 section과 관련 part 조회',
        description: `
            1. 페이지네이션을 위해 커서와 페이지 사이즈를 옵셔널하게 받음
            2. 기본적으로 section과 part는 order 로 정렬되서 옴
            3. 페이지네이션도 section의 order값 순서로 옴
            4. 데이터, 다음 커서값, 다음 데이터가 있는지 3가지 정보를 받음
            `,
      }),
      ApiResponse({
        status: 200,
        description:
          '요청한 페이지네이션 정보, 다음 커서값, 다음 페이지의 유뮤를 보내줌',
        type: ResPaginationOfSectionPartsDto,
      }),
    );
  },
  updateAll: () => {
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
  updateOrder: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'section 순서 변경',
      }),
      ApiBody({
        description: '섹션 순서 수정에 필요한 정보',
        type: UpdateSectionOrderDto,
      }),
      ApiResponse({
        status: 204,
        description:
          'order 값이 변경됨, 변경된 순서에 따라서 다른 section의 order도 업데이트 됨',
        type: ResSectionDto,
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
