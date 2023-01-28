import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Logger2Middleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Second Middleware Execute");

        // req.user = ""

        return next();
    }
}
