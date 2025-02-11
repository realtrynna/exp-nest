import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {
  }

  getHello(): string {
    const payload = {
      name: "윤승근",
      age: 32
    }

    this.eventEmitter.emit("app.getHello", payload);

    return 'Hello World!';
  }
}
