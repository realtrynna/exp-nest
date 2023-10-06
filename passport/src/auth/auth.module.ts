import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "src/auth/auth.controller";
import { KakaoStrategy } from "src/auth/strategies/kakao.strategy";
import { GoogleStrategy } from "src/auth/strategies/google.strategy";
import { NaverStrategy } from "src/auth/strategies/naver.strategy";

@Module({
    imports: [
        PassportModule.register({ session: false })
    ],
    controllers: [AuthController],
    providers: [
        KakaoStrategy,
        GoogleStrategy,
        NaverStrategy,
    ],
})
export class AuthModule {}