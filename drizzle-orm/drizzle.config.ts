import type { Config } from "drizzle-kit"

export default {
    schema: "src/db/schemas/*.ts",
    driver: "pg",
    out: "./drizzle",
    dbCredentials: {
        connectionString: "postgres://postgres:1234@127.0.0.1:5432/articles",
    }
} satisfies Config