import { registerAs } from "@nestjs/config";

export default registerAs("email", () => ({
    baseUrl: process.env.BASE_URL,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}));
