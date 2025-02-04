import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetAllUsers } from '../swagger-dacorator/get-all-users-decorators';
import { ApiGetUser } from '../swagger-dacorator/get-user-decorators';
import { ApiUpdateUser } from '../swagger-dacorator/patch-user-decorators';
import { ApiDeleteUser } from '../swagger-dacorator/delete-user-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from '../entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiGetUser()
  @Get('me')
  @UseGuards(AuthGuard('accessToken'))
  async getMe(@User() user: UserInfo) {
    return this.usersService.getUser(user.id);
  }

  @ApiUpdateUser()
  @Patch('me')
  @UseGuards(AuthGuard('accessToken'))
  async updateMe(
    @User() user: UserInfo,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.updateUser(user.id, updateUserData);
  }

  @ApiDeleteUser()
  @Delete('me')
  @UseGuards(AuthGuard('accessToken'))
  async deleteMe(@User() user: UserInfo) {
    await this.usersService.deleteUser(user.id);
    return { statusCode: 204, message: 'No Content' };
  }

  @Get('me/token')
  @UseGuards(AuthGuard('accessToken'))
  async getMyToken(@User() user: UserInfo) {
    return this.usersService.getMyToken(user.id);
  }

  @ApiGetAllUsers()
  @Get()
  //@UseGuards(AuthGuard('adminAccessToken'))
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiGetUser()
  @Get(':userId')
  @UseGuards(AuthGuard('adminAccessToken'))
  async getUser(@Param('userId', PositiveIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }

  @ApiDeleteUser()
  @Delete(':userId')
  @UseGuards(AuthGuard('adminAccessToken'))
  async deleteUser(@Param('userId', PositiveIntPipe) userId: number) {
    await this.usersService.deleteUser(userId);
    return { statusCode: 204, message: 'No Content' };
  }
}
