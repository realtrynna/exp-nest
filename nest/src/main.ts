import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { port, swaggerConfig } from "./config";
import { HttpExceptionFilter } from "./common/http.exception.filter";

// eslint-disable-next-line prettier/prettier
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());
    
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("", app, swaggerDocument);

    console.log(port);

    await app.listen(port);
    
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
