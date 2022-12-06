import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    // 서비스에서 서비스 사용 시 providers 등록
    constructor(private configService: ConfigService) {}

    envTesting(): string {
        return this.configService.get("PORT");
    }
}
