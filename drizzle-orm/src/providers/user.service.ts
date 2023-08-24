import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { eq } from "drizzle-orm";

import {
    users,
    profile,
    NewUser
} from "src/db/schemas/loader";
import {
    type
        InsertUser,
        InsertProfile,
        // NewUser
} from "src/db/schemas/loader";

@Injectable()
export class UserService {
    constructor(
        @Inject("DATABASE_CONNECTION") private readonly db: any
    ) {
    }

    async createUser(createUserDto: InsertUser & InsertProfile) {
        const { email, gender, metadata } = createUserDto;

        const createUserGroup = await this.db.transaction(async (tx) => {
            try {
                const createUser = await this.db
                    .insert(users)
                    .values({ email })
                    .returning();

                const userId = createUser[0]?.id;

                const createProfile = await this.db
                    .insert(profile)
                    .values({ gender, metadata, userId });

                return true;
            } catch (err) {
                throw new BadRequestException("transaction test");
                await tx.rollback();
            }
        });

        return createUserGroup;
    }

    async getUserList() {
        const userList = await this.db.query.users.findMany({
            columns: {
                email: true,
            },
            with: {
                profile: {
                    columns: {
                        gender: true,
                    }
                }
            }
        });

        /**
         * leftJoin, rightJoin, innerJoin, fullJoin
         */
        const userListJoin = await this.db
            .select({
                userId: users.id,
                gender: profile.gender
            })
            .from(users)
            .innerJoin(
                profile,
                eq(users.id, profile.userId)
            );

        return userList;
    }
}