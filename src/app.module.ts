import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./users/users.module";

import EmailConfig from "./config/email.config";
import { validationEnv } from "./config/validation";

// function test() {
//     console.log("언제 실행되나요??");
//     return {
//         DB: "mysql",
//         ID: "root",
//         PW: "password",
//     };
// }

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: [
                `${__dirname}/config/env/.${process.env.NODE_ENV}.env`,
            ],
            load: [EmailConfig],
            isGlobal: true,
            validationSchema: validationEnv,
        }),
    ],
    providers: [],
})
export class AppModule {}

console.log(process.env.NODE_ENV);
