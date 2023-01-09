import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line prettier/prettier
export class UserMeta {
	@ApiProperty({
		example: 1,
		description: "사용자 아이디",
		required: true,
	})
	id: number;
	email: string;
	name: string;
	gender: boolean;
}
