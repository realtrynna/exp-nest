import { EventEmitter } from "events";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "src/app.module";

export class BootstrapApplication extends EventEmitter {
    #_application: NestExpressApplication | null = null;

    static #INSTANCE: BootstrapApplication;

    constructor() {
        super();

        this.on("ready", () => {
            this.onReady().start();
        });
    }

    app(): NestExpressApplication | null {
        return this.#_application;
    }

    onReady(): BootstrapApplication {
        /**
         * https://medium.com/dailyjs/how-to-prevent-your-node-js-process-from-crashing-5d40247b8ab2
         * https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/?source=post_page-----4b976be5efeb--------------------------------
         * 앱에서 처리되지 못한 예외가 잡히지만 근본적인 에러 처리는 아니다
         * 노드는 해당 콜백에서 작성된 로직의 실행을 100% 보장하지 않는다
         */
        process.on("uncaughtException", (err: Error) =>
            console.log("Global uncaught exception"),
        );

        /**
         * 처리되지 않은 Promise reject가 잡힌다
         * (버전 15부터 warning이 아닌 throw로 캡처되므로, 프로세스가 죽는다)
         *
         * 콜백이 여러번 호출되면 사후 코드에 문제가 생길 수 있으므로
         * 개발 중 Debug 용도로만 사용하는 게 좋다
         */
        process.on("unhandledRejection", (err: Error) =>
            console.log("Global rejection"),
        );

        return this;
    }

    async start() {
        this.#_application = await NestFactory.create<NestExpressApplication>(
            AppModule,
        );

        await this.#_application.listen(4000);
    }

    static getInstance() {
        if (!BootstrapApplication.#INSTANCE) {
            BootstrapApplication.#INSTANCE = new BootstrapApplication();
        }

        return BootstrapApplication.#INSTANCE;
    }
}
