import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../users/infra/typeorm/repositories/user.repository';
import { AuthController } from './controllers/Auth.controller';
import { BcryptHashProvider } from './providers/HashProvider/implementations/BcryptHashProvider';
import { AuthenticationService } from './services/Authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    AuthenticationService,
    {
      provide: 'HashProvider',
      useValue: BcryptHashProvider,
    },
  ],
})
export class AuthModule {}
