import { Injectable, Inject } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";

import { users } from "src/db/schema/users";

@Injectable()
export class UserService {
    constructor(
        @Inject("DATABASE_CONNECTION") private readonly db: any
    ) {
    }

    async getUserList() {
        const result = await this.db.select().from(users);

        return result;
    }
}