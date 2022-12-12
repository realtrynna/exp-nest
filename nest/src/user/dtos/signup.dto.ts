import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    email: string;

    password: string;

    gender: boolean;

    introduce: string;

    constructor({ email, password, gender, introduce }) {
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.introduce = introduce;
    }
}
