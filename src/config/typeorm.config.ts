import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: process.env.POSTGRES_URL || null,
      host: process.env.POSTGRES_URL ? null : process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_URL ? null : parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_URL ? null : process.env.POSTGRES_USER,
      database: process.env.POSTGRES_URL ? null : process.env.POSTGRES_DB,
      password: process.env.POSTGRES_URL ? null : process.env.POSTGRES_PASSWORD,
      entities: [__dirname + '/../**/entities/*.{js,ts}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true,
      dropSchema: true,
      logging: true,
      ssl:  process.env.POSTGRES_URL ? { rejectUnauthorized: false } : false,
    };
  },
};