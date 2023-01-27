import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmailModule } from "../email/email.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { UserEntity } from "../entities/users.entity";
import { ProfileEntity } from "src/entities/profile.entity";

@Module({
    imports: [
        EmailModule,
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    ],
    controllers: [UsersController],
    providers: [UserService],
})
export class UserModule {}
