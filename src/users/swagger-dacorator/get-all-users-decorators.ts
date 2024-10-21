import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: '전체 유저 조회',
      description: `## 전체 유저 조회`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 전체 유저가 조회된 경우',
      content: {
        JSON: {
          example: [
            {
              id: 2,
              createdAt: '2024-10-14T06:33:20.072Z',
              updatedAt: '2024-10-14T06:33:20.072Z',
              nickname: 'gwgw2',
              profileImage: null,
              maxHealthPoint: 5,
              lastLogin: '2024-10-14T06:33:20.072Z',
              level: 1,
              experience: 30,
              experienceForNextLevel: 50,
              point: 200,
            },
            {
              id: 3,
              createdAt: '2024-10-14T08:56:25.726Z',
              updatedAt: '2024-10-14T08:56:25.726Z',
              nickname: 'gwgwgw3',
              profileImage: null,
              maxHealthPoint: 5,
              lastLogin: '2024-10-14T08:56:25.726Z',
              level: 2,
              experience: 20,
              experienceForNextLevel: 60,
              point: 5000,
            },
            {
              id: 4,
              createdAt: '2024-10-14T09:09:57.505Z',
              updatedAt: '2024-10-14T09:09:57.505Z',
              nickname: 'gwgwgwgw4',
              profileImage: null,
              maxHealthPoint: 5,
              lastLogin: '2024-10-14T09:09:57.505Z',
              level: 1,
              experience: 0,
              experienceForNextLevel: 50,
              point: 160,
            },
          ],
        },
      },
    }),
  );
}
