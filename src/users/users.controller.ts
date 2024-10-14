import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    console.log(userId);
    console.log(typeof userId);
    return this.usersService.getUser(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    this.usersService.deleteUser(userId);
    return { statusCode: 204, message: 'No Content' };
  }
}
