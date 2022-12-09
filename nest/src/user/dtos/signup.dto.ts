import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty({
        type: String,
        required: true,
        example: "admin@admin.com",
        description: "사용자 이메일",
    })
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        minimum: 8,
        maximum: 20,
        example: "knowledge",
        description: "사용자 패스워드",
    })
    password: string;

    @ApiProperty({
        type: Boolean,
        required: true,
        example: true,
        description: "사용자 성별",
    })
    gender: boolean;

    @ApiProperty({
        type: String,
        required: true,
        example: "자기소개입니다.",
        description: "사용자 자기소개",
    })
    introduce: string;

    constructor({
        email,
        password,
        gender,
        introduce
    }) {
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.introduce = introduce;
    }
}
