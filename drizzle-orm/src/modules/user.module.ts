import { Module } from "@nestjs/common";

import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/providers/user.service"
import { DbModule } from "src/modules/db.module";

@Module({
    imports: [DbModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}