import { Request } from "express";
import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("etc")
export class AppController {
    // eslint-disable-next-line prettier/prettier
    constructor(private readonly appService: AppService) {}

    @Post("/here")
    getEtc(@Req() req: Request): string {
        console.log(req.body);
        return "etc"
    }

    @Get(":id")
    getHello(): string {
        return this.appService.getHello();
    }
}
