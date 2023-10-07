import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import {Observable, tap} from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return  next
            .handle()
            .pipe(
                tap(() => console.log("after response"))
            )

    }
}