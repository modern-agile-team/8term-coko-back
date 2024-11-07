import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiQuizzes = {
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제 생성',
      }),
      ApiResponse({
        status: 201,
        description: '새 문제가 성공적으로 생성됨',
        content: {
          JSON: {
            example: {
              id: 4,
              partId: 1,
              title: '다음 보기를 보고 문제를 완성하세요',
              question: 'const num : number = 6 ',
              answer: [':number'],
              answerChoice: ['const', 'num', ':number', '6'],
              category: 'SHORT_ANSWER',
              createdAt: '2024-11-04T05:13:12.363Z',
              updatedAt: '2024-11-04T05:13:12.363Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: 'partId를 찾을 수 없음',
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
        description: '각 속성들의 타입들이 맞지 않음',
        content: {
          JSON: {
            example: {
              message: ['title must be a string'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'category속성의 enum값이 잘못됨',
        content: {
          JSON: {
            example: {
              message: ['bad category value'],
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
        status: 400,
        description: '배열 값을 가지는 속성의 배열안 값이 string이 아님',
        content: {
          JSON: {
            example: {
              message: ['each value in answer must be a string'],
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
        summary: '문제 전체 조회 & 쿼리를 사용한 부분 조회',
      }),
      ApiResponse({
        status: 200,
        description:
          '문제 전체속성을 조회함 & 쿼리를 사용해 특정 섹션과 파트 의 문제를 조회',
        content: {
          JSON: {
            example: [
              {
                id: 10,
                partId: 5,
                title: '문제의 출력 결과는?',
                question:
                  'const a = 10;\nlet b = "안녕";\nconsole.log(`${a}는${b}`);',
                answer: ['10는안녕'],
                answerChoice: [],
                category: 'SHORT_ANSWER',
                createdAt: '2024-11-04T15:45:11.575Z',
                updatedAt: '2024-11-06T04:29:35.281Z',
              },
              {
                id: 9,
                partId: 5,
                title: 'O,X중 하나를 골라주세요',
                question:
                  '자바스크립트에서 const로 선언한 변수는 재할당이 불가능하다.',
                answer: ['O'],
                answerChoice: [],
                category: 'OX_SELECTOR',
                createdAt: '2024-11-01T11:13:34.722Z',
                updatedAt: '2024-11-01T11:13:34.722Z',
              },
              {
                id: 8,
                partId: 5,
                title: '빈칸을 채우시오',
                question: '#empty# x = 5;',
                answer: ['let'],
                answerChoice: [
                  'let',
                  'defin',
                  'function',
                  'write',
                  'int',
                  'new',
                ],
                category: 'COMBINATION',
                createdAt: '2024-11-01T11:12:43.352Z',
                updatedAt: '2024-11-01T11:12:43.352Z',
              },
              {
                id: 7,
                partId: 5,
                title: '다음 중 옳은것은?',
                question:
                  '자바스크립트에서 변수를 선언할 때 사용할 수 없는 키워드는 무엇인가요?',
                answer: ['define'],
                answerChoice: ['let', 'const', 'var', 'define'],
                category: 'MULTIPLE_CHOICE',
                createdAt: '2024-11-01T11:10:42.395Z',
                updatedAt: '2024-11-01T11:10:42.395Z',
              },
              {
                id: 6,
                partId: 5,
                title: '변수에 값을 넣는 방법으로 올바른 키워드를 고르시오',
                question: 'let a ? 10',
                answer: ['='],
                answerChoice: ['=', '!', '@', '^'],
                category: 'MULTIPLE_CHOICE',
                createdAt: '2024-11-01T10:52:09.884Z',
                updatedAt: '2024-11-01T10:54:23.096Z',
              },
              {
                id: 5,
                partId: 5,
                title: '맞을까요?',
                question: 'let 10 + a;',
                answer: ['X'],
                answerChoice: [],
                category: 'OX_SELECTOR',
                createdAt: '2024-11-01T10:49:26.457Z',
                updatedAt: '2024-11-01T10:49:26.457Z',
              },
            ],
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '쿼리 sectionId 또는 partId를 찾을 수 없음',
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
        status: 404,
        description: '쿼리 sectionId 또는 partId가 양수가 아님',
        content: {
          JSON: {
            example: {
              message: ['sectionId must not be less than 0'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '쿼리 sectionId 또는 partId가 정수가 아님',
        content: {
          JSON: {
            example: {
              message: ['sectionId must be an integer number'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
    );
  },
  findOne: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제 단일 조회',
      }),
      ApiResponse({
        status: 200,
        description: '문제 id 통해 특정 한 문제를 조회',
        content: {
          JSON: {
            example: {
              id: 7,
              partId: 5,
              title: '다음 중 옳은것은?',
              question:
                '자바스크립트에서 변수를 선언할 때 사용할 수 없는 키워드는 무엇인가요?',
              answer: ['define'],
              answerChoice: ['let', 'const', 'var', 'define'],
              category: 'MULTIPLE_CHOICE',
              createdAt: '2024-11-01T11:10:42.395Z',
              updatedAt: '2024-11-01T11:10:42.395Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '문제를 찾을 수 없음',
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
        description: '문제 id가 정수형 숫자값이 아님',
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
        summary: '단일 문제 수정',
      }),
      ApiResponse({
        status: 200,
        description: '문제의 id param값을 통해 단일 문제 수정',
        content: {
          JSON: {
            example: {
              id: 1,
              partId: 1,
              title: '예상출력을 작성하세요',
              question: 'function add(a , b){ return a+b}',
              answer: ['5'],
              answerChoice: ['function', 'add(a, b)'],
              category: 'MULTIPLE_CHOICE',
              createdAt: '2024-10-31T08:31:11.300Z',
              updatedAt: '2024-11-06T08:34:23.658Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '문제 id 값 또는 파트 id 값을 찾을 수 없음',
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
        description: '문제 body에 속성으로 이상한 속성이 들어옴 ',
        content: {
          JSON: {
            example: {
              message: [
                'property sectionId should not exist',
                'property part should not exist',
              ],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'part의 id 값이 정수가 아님',
        content: {
          JSON: {
            example: {
              message: ['partId must be an integer number'],
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
        summary: '단일 문제 삭제',
      }),
      ApiResponse({
        status: 200,
        description: '문제의 id param값을 통해 단일 문제 삭제',
        content: {
          JSON: {
            example: {
              id: 1,
              partId: 1,
              title: '예상출력을 작성하세요',
              question: 'function add(a , b){ return a+b}',
              answer: ['5'],
              answerChoice: ['function', 'add(a, b)'],
              category: 'MULTIPLE_CHOICE',
              createdAt: '2024-10-31T08:31:11.300Z',
              updatedAt: '2024-11-06T08:38:53.958Z',
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '문제 id 값을 찾을 수 없음',
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
        description: '문제 id 값이 양수가 아님',
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
        description: '문제 id 값이 정수가 아님',
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
};
