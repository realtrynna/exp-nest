export class VerifyEmailDto {
	verifyEmailToken: string;

	constructor({ verifyEmailToken }) {
		this.verifyEmailToken = verifyEmailToken;
	}
}
