import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(typeOrmConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
