import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ResQuizDto } from './dto/res-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

export const ApiQuizzes = {
  createQuiz: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제 생성',
      }),
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: CreateQuizDto,
      }),
      ApiResponse({
        status: 204,
        description: '새 문제가 성공적으로 생성됨',
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
  getQuizzes: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제 전체 조회 & 쿼리를 사용한 부분 조회',
      }),
      ApiResponse({
        status: 200,
        description:
          '문제 전체속성을 조회함 & 쿼리를 사용해 특정 섹션과 파트 의 문제를 조회',
        type: ResQuizDto,
        isArray: true,
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
  getQuiz: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문제 단일 조회',
      }),
      ApiResponse({
        status: 200,
        description: '문제 id 통해 특정 한 문제를 조회',
        type: ResQuizDto,
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
  getQuizzesProgressIncorrect: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저가 틀렸던 문제 조회',
      }),
      ApiResponse({
        status: 200,
        description:
          '유저 id 통해 진행도에서 틀렸던 문제를 확인 후 문제를 보냄',
        type: ResQuizDto,
        isArray: true,
        content: {
          JSON: {
            example: [
              {
                id: 1,
                partId: 1,
                title: '다음 보기를 보고 문제를 완성하세요2',
                question: 'const num : number = 6 ',
                answer: ['6'],
                answerChoice: ['const', 'num', ':number', '6'],
                category: 'SHORT_ANSWER',
                createdAt: '2024-11-18T07:23:23.956Z',
                updatedAt: '2024-11-18T07:23:23.956Z',
              },
            ],
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '존재하지 않는 유저 id',
        content: {
          JSON: {
            example: {
              message: '존재하지 않는 유저',
              error: 'Not Found',
              statusCode: 404,
            },
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
        status: 400,
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
        status: 400,
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
  updateQuiz: () => {
    return applyDecorators(
      ApiOperation({
        summary: '단일 문제 수정',
      }),
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: UpdateQuizDto,
      }),
      ApiResponse({
        status: 204,
        description: '문제의 id param값을 통해 단일 문제 수정',
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
  deleteQuiz: () => {
    return applyDecorators(
      ApiOperation({
        summary: '단일 문제 삭제',
      }),
      ApiResponse({
        status: 204,
        description: '문제의 id param값을 통해 단일 문제 삭제',
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
