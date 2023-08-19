import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Controller("upload")
export class OptimizeController {
    constructor(
        /**
         * Module에 등록한 name token
         */
        @InjectQueue("resize") private readonly optimizeQueue: Queue
    ) {
    }

    @Post("file")
    async optimize() {
        /*
         * Queue에 작업 add
         */
        const job = await this.optimizeQueue.add("optimize", {
            task: "작업을 전달합니다.",
        });

        return job;
    }

    @Post("job")
    async getJobResult(@Body() data: any) {
        /**
         * 작업 결과를 조회 후,
         */
        const getJobResult = await this.optimizeQueue.getJob(data.id);
        const isCompletedJob = await getJobResult.isCompleted();

            console.log("작업 결과", getJobResult.returnvalue);
        if (isCompletedJob) {
        }
    }
}