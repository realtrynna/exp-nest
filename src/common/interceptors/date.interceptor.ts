import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    // NestInterceptor Interface를 구현한 Class
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // NestInterceptor Interface의 intercept Method
        // Request Before
        console.log("Before Execute"); // Request Handler 전달 전 실행 로직

        // Response After
        const now = new Date();

        return next.handle().pipe(
            tap(() => console.log("After Execute")), // Response 후 실행 로직
        );
    }
}
