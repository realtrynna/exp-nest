import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

// import { BaseInterceptor } from './common/interceptors/date.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global Interceptor
    // app.useGlobalInterceptors(new DateInterCeptor());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle("NestJS로 배우는 백엔드 프로그래밍")
        .setDescription(
            "NestJS로 배우는 백엔드 프로그래밍 서적을 읽고 실습한 기능입니다.",
        )
        .setVersion("1.0.0")
        // .addCookieAuth("connect.sid");
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            tagsSorter: "alpha",
            operationSorter: "method",
        },
    });

    await app.listen(1000);
}
bootstrap();
