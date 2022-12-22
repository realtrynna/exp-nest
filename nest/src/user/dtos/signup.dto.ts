import { ApiProperty } from "@nestjs/swagger";
import { isEmail } from "class-validator";

export class SignUpDto {
    @isEmail("here", {
        ignore_max_length: true,
    })
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
