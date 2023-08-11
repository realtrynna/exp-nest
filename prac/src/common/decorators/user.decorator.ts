import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserMeta = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        console.log("Data는", data);

        return request.user;
    },
);
