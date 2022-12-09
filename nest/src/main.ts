import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { port, swaggerConfig } from "./config";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
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
