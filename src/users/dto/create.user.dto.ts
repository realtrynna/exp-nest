import { ApiProperty, ApiHeader } from '@nestjs/swagger';

@ApiHeader({ name: '' })
// eslint-disable-next-line prettier/prettier
export class createUserDto {
	@ApiProperty({
		example: "admin@admin.com",
		description: "",
		required: true,
	})
	email: string;
	// eslint-disable-next-line prettier/prettier

	@ApiProperty({
		example: "윤승근",
		description: "",
		required: true,
	})
	name: string;
	// eslint-disable-next-line prettier/prettier

	@ApiProperty({
		example: "password!",
		description: "",
		required: true,
	})
	password: string;
	// eslint-disable-next-line prettier/prettier

	@ApiProperty({
		example: true,
		description: "남자 true 여자 false",
		required: true,
	})
	gender: boolean;

	constructor({ email, name, password, gender }) {
		this.email = email;
		this.name = name;
		this.password = password;
		this.gender = gender;
	}
}
