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
    async optimize(@Body() data: any) {
        /*
         * Queue add
         */
        const job = await this.optimizeQueue.add({
            task: data,
        });

        return job;
    }

    @Post("job")
    async getJobResult(@Body() data: any) {
        /**
         * 작업 결과를 조회 후,
         */
        const getJobResult = await this.optimizeQueue.getJob(data.id);

        console.log("job result", getJobResult);

        // const isCompletedJob = await getJobResult.isCompleted();
        //
        // if (isCompletedJob) {
        // }
    }
}