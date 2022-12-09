import { DocumentBuilder } from "@nestjs/swagger";

export const port = process.env.PORT || 1000;

export const swaggerConfig = new DocumentBuilder()
            .setTitle("Slack Clone")
            .setDescription("Slack Clone API입니다.")
            .setVersion("1.0.0")
            .build();