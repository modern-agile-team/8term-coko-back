import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiAdmins = {
  LoginAdmin: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'admin 정보 인증',
      }),
      ApiResponse({
        status: 200,
        description: `admin 정보가 인증됨`,
      }),
    );
  },
};
