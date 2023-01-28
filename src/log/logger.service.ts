import { ConsoleLogger, Injectable } from "@nestjs/common";

Injectable();
export class CustomLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        super.error.apply(this, arguments);

        this.logger();
    }

    logger() {
        console.log("Logger Execute");
    }
}
