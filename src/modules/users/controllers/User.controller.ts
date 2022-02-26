import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserDto } from '../dtos/UserDto';
import { CreateUserService } from '../services/createUser.service';
import { GetAllUsersService } from '../services/GetAllUsers.service';
import { GetOneUserService } from '../services/GetOneUser.service';
import { RemoveUserService } from '../services/RemoveUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly getUsers: GetAllUsersService,
    private readonly getUser: GetOneUserService,
    private readonly updateUser: UpdateUserService,
    private readonly removeUser: RemoveUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.run(createUserDto);
  }

  @Get()
  findAll() {
    return this.getUsers.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUser.run(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.updateUser.run(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUser.run(id);
  }
}
