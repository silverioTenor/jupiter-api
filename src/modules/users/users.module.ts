import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BcryptHashProvider } from '../auth/providers/HashProvider/implementations/BcryptHashProvider';

import { UserController } from './controllers/User.controller';
import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { CreateUserService } from './services/createUser.service';
import { GetAllUsersService } from './services/GetAllUsers.service';
import { GetOneUserService } from './services/GetOneUser.service';
import { RemoveUserService } from './services/RemoveUser.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetAllUsersService,
    GetOneUserService,
    UpdateUserService,
    RemoveUserService,
    {
      provide: 'HashProvider',
      useClass: BcryptHashProvider,
    },
  ],
})
export class UsersModule {}
