import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }

  @Post()
  createUser(@Body() createUserData: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.createUser(createUserData);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.updateUser(userId, updateUserData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    this.usersService.deleteUser(userId);
    return { statusCode: 204, message: 'No Content' };
  }
}
