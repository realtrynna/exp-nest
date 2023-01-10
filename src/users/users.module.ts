import { Module } from "@nestjs/common";
import { EmailModule } from "../email/email.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { ConfigService } from "@nestjs/config/dist";

@Module({
    imports: [EmailModule],
    controllers: [UsersController],
    providers: [UserService, ConfigService],
})
export class UserModule {}
