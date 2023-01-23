import { NestApplicationOptions } from "@nestjs/common";
import { ConfigModuleOptions } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "@yetoman/user";

const serverConfig: NestApplicationOptions = {
  logger: ['error', 'warn'],
};

const appConfig: ConfigModuleOptions = {
  isGlobal: true,
};

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  logging: true,
  logger: 'file',
  entities: [User],
  autoLoadEntities: false,
};

export const environment = {
  production: true,
  serverConfig,
  appConfig,
  dbConfig,
};
