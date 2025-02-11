import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class JobListener {
    @OnEvent("app.getHello", { async: true, suppressErrors: true })
    async handleAppHello(payload) {
        console.log("app hello", payload);

        throw new Error("이벤트 수신 과정에서 서버 폭파.")
    }
}