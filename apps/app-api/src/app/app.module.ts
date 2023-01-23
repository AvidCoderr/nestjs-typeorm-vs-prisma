import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "@yetoman/user";

import { PrismaService } from "../../db/prisma/prisma.service";
import { typeOrmConfig } from "../../db/typeorm/orm.app.cfg";
import { environment } from "../environments/environment";
import { AppConfiguration } from "./app.cfg";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      ...environment.appConfig,
      load: [AppConfiguration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
