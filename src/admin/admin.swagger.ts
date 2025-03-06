import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiAdmins = {
  loginAdmin: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'admin 로그인',
      }),
      ApiResponse({
        status: 200,
        description: `admin 정보가 인증됨`,
      }),
    );
  },
  verifyAdmin: () => {
    return applyDecorators(
      ApiCookieAuth('adminAccessToken'),
      ApiOperation({
        summary: 'admin 토큰 인증 - admin',
      }),
      ApiResponse({
        status: 200,
        description: `admin 토큰이 인증됨`,
      }),
    );
  },
};
