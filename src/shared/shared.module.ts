import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { ensureAuthentication } from '../modules/auth/infra/http/middlewares/ensureAuthentication';
import { FlightController } from '../modules/flights/controllers/Flight.controller';
import { UserController } from '../modules/users/controllers/User.controller';

@Module({
  imports: [AuthModule],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ensureAuthentication).forRoutes(UserController);
    consumer.apply(ensureAuthentication).forRoutes(FlightController);
  }
}
