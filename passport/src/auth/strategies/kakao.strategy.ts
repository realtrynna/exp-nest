import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-kakao";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
    constructor() {
        super({
            clientID: "here",
            clientSecret: "here",
            callbackURL: "http://localhost:3000/auth/kakao/callback"
        });

        console.log("카카오 전략 클래스 생성");
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
        /**
         * 로그인 또는 회원가입 로직 작성
         * done 2번째 매개 변수로 넣은 값이 Controller에 req.user
         */
        done(null, profile);
    }
}