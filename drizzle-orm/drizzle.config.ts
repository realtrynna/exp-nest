import type { Config } from "drizzle-kit"

export default {
    schema: "src/db/schema/*.ts",
    driver: "pg",
    out: "./drizzle",
    strict: true,
    dbCredentials: {
        connectionString: "postgres://postgres:1234@127.0.0.1:5432/article",
    }
} satisfies Config