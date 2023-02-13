import { Request, Response } from "express";
import {
    Catch,
    ArgumentsHost,
    InternalServerErrorException,
    HttpException,
    ExceptionFilter,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly configService: ConfigService) {}
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
        }

        const response = (exception as HttpException).getResponse();

        const log = {
            timestamp: new Date(),
            url: req.url,
            response,
        };

        console.log(log);

        return res
            .status((exception as HttpException).getStatus())
            .json(response);
    }
}
