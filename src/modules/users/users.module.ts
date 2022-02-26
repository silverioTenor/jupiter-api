import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/User.controller';
import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { CreateUserService } from './services/createUser.service';
import { GetAllUsersService } from './services/GetAllUsers.service';
import { GetOneUserService } from './services/GetOneUser.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [CreateUserService, GetAllUsersService, GetOneUserService, UpdateUserService],
})
export class UsersModule { }
