import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('TYPEORM_HOST'),
    port: parseInt(configService.get('TYPEORM_PORT')),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
    synchronize: true,
  }),
  inject: [ConfigService],
} as TypeOrmModuleAsyncOptions;
