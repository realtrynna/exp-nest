import {Catch, ArgumentsHost, HttpServer} from "@nestjs/common";
import {AbstractHttpAdapter, BaseExceptionFilter} from "@nestjs/core";
import * as Sentry from "@sentry/node";

/**
 * Catch가 비어 있으므로, 일반적인 ExceptionFilter
 */
@Catch()
export class SentryFilter extends BaseExceptionFilter {
    catch(
        exception: unknown,
        host: ArgumentsHost
    ) {
        console.log("sentry execute");

        Sentry.captureException(exception);

        super.catch(exception, host);
    }
}