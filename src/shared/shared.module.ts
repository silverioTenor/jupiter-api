import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { ensureAuthentication } from '../modules/auth/infra/http/middlewares/ensureAuthentication';
import { UserController } from '../modules/users/controllers/User.controller';

@Module({
  imports: [AuthModule],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ensureAuthentication).forRoutes(UserController);
  }
}
