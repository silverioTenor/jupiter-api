import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUserDto';
import { CreateUserService } from '../services/createUser.service';
import { GetAllUsersService } from '../services/GetAllUsers.service';
import { GetOneUserService } from '../services/GetOneUser.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly getUsers: GetAllUsersService,
    private readonly getUser: GetOneUserService
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() userDto: UserDto) {
  //   return this.usersService.update(+id, userDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
