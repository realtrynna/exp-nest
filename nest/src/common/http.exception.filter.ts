import { Response } from "express";
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        // eslint-disable-next-line prettier/prettier
        const err = exception.getResponse() as 
            | string
            | { error: string; statusCode: 400; message: string[] };

        console.log("exception!", err, status);

        // exception.getHttpExceptionOptionsFrom()

        // if (typeof err !== "string" && err.error === "Bae Request") {
        //     return response.status(status).json({
        //         success: false,
        //         code: status,
        //         data: err.message,
        //     });
        // }
    }
}