import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/users.entity";

import { EmailModule } from "../email/email.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
    imports: [EmailModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UserService],
})
export class UserModule {}
