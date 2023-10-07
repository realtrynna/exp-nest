import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import * as Sentry from "@sentry/node";

import { AppModule } from './app.module';

import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { SentryFilter } from "src/filters/sentry.filter";
import {Http} from "@sentry/node/types/integrations";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new LoggingInterceptor());

  Sentry.init({
    dsn: "https://de3969a8d40a94276abd902b90762e98@o4505486485094400.ingest.sentry.io/4505775578349568"
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(4000);
}
bootstrap();