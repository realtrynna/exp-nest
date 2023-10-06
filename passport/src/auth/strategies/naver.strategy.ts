import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-naver-v2";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, "naver") {
    constructor() {
        super({
            clientID: "here",
            clientSecret: "here",
            callbackURL: "http://localhost:3000/auth/naver/callback",
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
        done(null, profile);
    }
}