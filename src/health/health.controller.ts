import { Controller, Get } from "@nestjs/common";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
} from "@nestjs/terminus";

@Controller("health-check")
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        console.log("Health Check Execute");
        return this.health.check([
            () => this.http.pingCheck("NestJS", "https://docs.nestjs.com"),
        ]);
    }
}
