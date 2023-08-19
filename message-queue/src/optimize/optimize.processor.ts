import { Injectable } from "@nestjs/common";
import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";

@Injectable()
@Processor("resize")
export class OptimizeProcessor {
    constructor() {
    }

    @Process("optimize")
    async handleOptimization(job: Job) {
        return "작업 결과를 반환합니다.";
    }
}