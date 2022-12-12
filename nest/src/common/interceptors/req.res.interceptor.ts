import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ReqResInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
        // request before
        console.log("request before");

        // response after
        // data => controller에서 return 해주는 데이터
        // 최종 response가 undefined인 경우 에러 처리
        return next.handle().pipe(
            map((data) => {
                console.log("response after");
                return data === undefined ? null : data;
            }),
        );

        // pipe 에러 처리
    }
}
