import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class NaverGuard extends AuthGuard("naver") {
    /**
     * 에러 커스텀 가드
     * @param err
     * @param user strategy를 거쳐 통과한 user
     * @param info
     * @param context
     * @param status
     */
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        console.log("guard execution");

        console.log("handle request context", context);
        console.log("handle request user", user);

        /**
         * 기존 구현부
         */
        return super.handleRequest(err, user, info, context, status);
    }
}