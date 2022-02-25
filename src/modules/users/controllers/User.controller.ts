import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserDto } from '../dtos/userDto';
import { CreateUserService } from '../services/createUser.service';
import { GetAllUsersService } from '../services/GetAllUsers.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly getUsers: GetAllUsersService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.run(createUserDto);
  }

  @Get()
  findAll() {
    return this.getUsers.run();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() userDto: UserDto) {
  //   return this.usersService.update(+id, userDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
