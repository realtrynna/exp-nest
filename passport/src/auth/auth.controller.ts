import { Controller, Post, Get, UseGuards, Req, Res } from "@nestjs/common";

import { KakaoGuard } from "src/auth/guards/kakao.guard";
import { GoogleGuard } from "src/auth/guards/google.guard";
import { NaverGuard } from "src/auth/guards/naver.guard";

@Controller("auth")
export class AuthController {
    constructor() {
    }

    @Post("sign")
    async signUp() {
        console.log("here");
    }

    @Get("naver")
    @UseGuards(NaverGuard)
    async naverLogin() {
        console.log("naver login");
    }

    @Get("naver/callback")
    @UseGuards(NaverGuard)
    async naverLoginCallback(@Req() req, @Res() res) {
        // console.log("user", req.user);

        res.send(`
            <div>
            <h2>축하드려요!</h2>
            <p>네이버 로그인에 성공하였어요!</p>
        </div>
        `);
    }

    @Get("google")
    @UseGuards(GoogleGuard)
    async googleLogin() {
        console.log("google login");
    }

    @Get("google/callback")
    @UseGuards(GoogleGuard)
    async googleLoginCallback(@Req() req, @Res() res) {
        console.log("user", req.user);

        res.send(`
            <div>
            <h2>축하드려요!</h2>
            <p>구글 로그인에 성공하였어요!</p>
        </div>
        `);
    }

    @Get("kakao")
    @UseGuards(KakaoGuard)
    async kakaoLogin() {
        console.log("kakao login");
    }

    @Get("kakao/callback")
    @UseGuards(KakaoGuard)
    async kakaoLoginCallback(@Req() req, @Res() res) {
        console.log("user", req.user);

        res.send(`
            <div>
            <h2>축하드려요!</h2>
            <p>카카오 로그인에 성공하였어요!</p>
        </div>
        `);
    }
}