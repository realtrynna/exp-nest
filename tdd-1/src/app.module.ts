import { Module } from "@nestjs/common";
import { AppointmentService } from './appointment/appointment.service';
import { ArticlesService } from './articles/articles.service';

@Module({
    imports: [],
    controllers: [],
    providers: [AppointmentService, ArticlesService],
})
export class AppModule {}
