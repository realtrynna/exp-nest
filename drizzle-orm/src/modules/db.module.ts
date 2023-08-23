import { Module } from "@nestjs/common";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Module({
    providers: [
        {
            provide: "DATABASE_CONNECTION",
            useFactory: async () => {
                // const or = new Client({
                //     connectionString: "postgres://user:password@host:port/db",
                // })

                const client = new Client({
                    host: "127.0.0.1",
                    user: "postgres",
                    password: "1234",
                    database: "article",
                    port: 5432,
                });

                await client.connect();

                const db = await drizzle(
                    client,
                    {
                        logger: true,
                    }
                )

                return db;
            }
        }
    ],
    exports: ["DATABASE_CONNECTION"],
})
export class DbModule {}