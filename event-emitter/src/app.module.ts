import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JobListener } from "./events/job.listener";

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, JobListener],
})
export class AppModule {}
