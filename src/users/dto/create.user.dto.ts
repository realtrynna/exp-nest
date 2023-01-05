export class createUserDto {
	email: string;
	name: string;
	password: string;
	gender: boolean;

	constructor({ email, name, password, gender }) {
		this.email = email;
		this.name = name;
		this.password = password;
		this.gender = gender;
	}
}
