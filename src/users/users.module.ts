import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmailModule } from "../email/email.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { CustomLogger } from "../log/logger.service";
import { UserEntity } from "../entities/users.entity";
import { ProfileEntity } from "src/entities/profile.entity";

@Module({
    imports: [
        EmailModule,
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]),
    ],
    controllers: [UsersController],
    providers: [UserService, CustomLogger],
})
export class UserModule {}
