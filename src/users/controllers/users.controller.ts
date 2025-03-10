import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetAllUsers } from '../swagger-decorator/get-all-users-decorators';
import { ApiGetUser } from '../swagger-decorator/get-me-decorators';
import { ApiUpdateUser } from '../swagger-decorator/patch-user-decorators';
import { ApiDeleteUser } from '../swagger-decorator/delete-user-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from '../entities/user.entity';
import { ApiAdminGetUser } from '../swagger-decorator/get-user-decorators';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 자신의 정보 가져오기
   */
  @ApiGetUser()
  @Get('me')
  @UseGuards(AuthGuard('accessToken'))
  async getMe(@User() user: UserInfo): Promise<ResponseUserDto> {
    return this.usersService.getUser(user.id);
  }

  /**
   * 회원 탈퇴시 사용
   * @param user
   * @param res
   */
  @ApiDeleteUser()
  @Delete('me')
  @UseGuards(AuthGuard('accessToken'))
  async deleteMe(
    @User() user: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.usersService.deleteUser(user.id, res);
  }

  /**
   * 모든 유저정보 가져오기 - admin
   * @returns
   */
  @ApiGetAllUsers()
  @Get()
  @UseGuards(AuthGuard('adminAccessToken'))
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return this.usersService.getAllUsers();
  }

  /**
   * 유저정보 업데이트
   * @param user
   * @param updateUserData 포인트, 경험치
   * @returns
   */
  @ApiUpdateUser()
  @Patch(':userId')
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateMe(
    @User() user: UserInfo,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.updateUser(user.id, updateUserData);
  }

  /**
   * 유저 정보 가져오기 - admin
   * @param userId
   * @returns
   */
  @ApiAdminGetUser()
  @Get(':userId')
  @UseGuards(AuthGuard('adminAccessToken'))
  async getUser(
    @Param('userId', PositiveIntPipe) userId: number,
  ): Promise<ResponseUserDto> {
    return this.usersService.getUser(userId);
  }
}
