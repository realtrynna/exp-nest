import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        console.log("AuthGuard Execution");

        request.user = {
            name: "윤승근",
            age: 30,
        };

        return true;
    }

    #validateRequest(request: any) {
        return true;
    }
}
