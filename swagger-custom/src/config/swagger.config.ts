import { DocumentBuilder } from "@nestjs/swagger";

export class SwaggerConfigBuilder {
    private readonly _documentBuilder;

    constructor() {
        this._documentBuilder = new DocumentBuilder();
    }

    swaggerConfig() {
        return this._documentBuilder
            .setTitle("swagger custom")
            .setDescription("swagger custom description")
            .setVersion("1.0.0")
            .build();
    }
}