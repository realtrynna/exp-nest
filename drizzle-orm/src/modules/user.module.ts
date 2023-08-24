import { Module } from "@nestjs/common";

import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/providers/user.service"
import { DrizzleModule } from "src/modules/drizzle.module";

@Module({
    imports: [DrizzleModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}