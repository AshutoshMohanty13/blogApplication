import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { HelperModule } from "src/helper/helper.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    HelperModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY || "secret",
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
