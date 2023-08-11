import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

interface IDatabaseConnection {
    production: TypeOrmModuleOptions;
}

type TPartialDatabaseType = Partial<TypeOrmModuleOptions>;
type TDatabaseType = "mysql";
type TPassword = "axisotherwise";

export default (configService: ConfigService): IDatabaseConnection => {
    const defaultOption = <TPartialDatabaseType>{
        type: configService.get("DB_TYPE"),
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        autoLoadEntities: true,
        // synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        dateStrings: true,
        bigNumberStrings: false,
        timezone: "Asia/Seoul",
    };

    console.log("디비 타입은", configService.get("DB_PASSWORD"));

    return {
        production: {
            type: "mysql",
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_DATABASE"),
            autoLoadEntities: true,

            namingStrategy: new SnakeNamingStrategy(),
            dateStrings: true,
            bigNumberStrings: false,
            timezone: "Asia/Seoul",
            synchronize: false,
            logging: ["error", "warn"],
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
        },
    };
};

interface ITest {
    name: string;
    age: number;
    gender: boolean;
}
