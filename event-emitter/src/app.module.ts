import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JobListener } from "./events/job.listener";
import { UploadController } from "./uploads/upload.controller";
import { UploadModule } from "./uploads/upload.module";

@Module({
  imports: [
      EventEmitterModule.forRoot(),
      UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobListener],
})
export class AppModule {}
