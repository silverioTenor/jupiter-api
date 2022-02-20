import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './infra/typeorm/repositories/user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useValue: UserRepository,
    },
    UsersService,
  ],
})
export class UsersModule {}
