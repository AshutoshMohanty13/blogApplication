import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { HelperModule } from "./helper/helper.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../.env",
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    HelperModule,
  ],
})
export class AppModule {}
