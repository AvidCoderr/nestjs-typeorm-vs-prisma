import { NestApplicationOptions } from "@nestjs/common";
import { ConfigModuleOptions } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "@yetoman/user";

const serverConfig: NestApplicationOptions = {
  logger: ['error', 'warn', 'log', 'debug', 'verbose'],
};

const appConfig: ConfigModuleOptions = {
  isGlobal: true,
};

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  logging: true,
  entities: [User],
  autoLoadEntities: false,
};

export const environment = {
  production: false,
  serverConfig,
  appConfig,
  dbConfig,
};
