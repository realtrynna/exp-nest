import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

interface IEmailOptions {
	to: string;
	subject: string;
	html: string;
}

@Injectable()
export class EmailService {
	#transporter: Mail;

	constructor() {
		this.#transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: '',
				pass: '',
			},
		});
	}

	async sendUserCreateVerification(
		receiver: string,
		createUserVerifyToken: string,
	) {
		const baseUrl = 'http://localhost:3000';
		const url = `${baseUrl}/users/email-verify?verifyEmailToken=${createUserVerifyToken}`;

		const emailOptions: IEmailOptions = {
			to: receiver,
			subject: '가입 인증 이메일',
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
