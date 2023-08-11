import { Inject, Injectable } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import emailConfig from "src/config/email.config";

interface IEmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    #transporter: Mail;

    constructor(
        @Inject(emailConfig.KEY)
        private readonly config: ConfigType<typeof emailConfig>,
    ) {
        this.#transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            },
        });
    }

    async sendUserCreateVerification(
        receiver: string,
        createUserVerifyToken: string,
    ) {
        const baseUrl = this.config.baseUrl;
        const url = `${baseUrl}/users/email-verify?verifyEmailToken=${createUserVerifyToken}`;

        const emailOptions: IEmailOptions = {
            to: receiver,
            subject: "가입 인증 이메일",
            html: `
                클릭 시 가입 인증 완료 
                
                <br>
                
                <form action="${url}" method="POST">
                    <button>확인</button>
                </form>
            `,
        };

        return await this.#transporter.sendMail(emailOptions);
    }
}
