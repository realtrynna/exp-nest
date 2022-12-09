import { ApiProperty } from "@nestjs/swagger";

import { SignUpDto } from "src/user/dtos";

export class UserDto extends SignUpDto {
    @ApiProperty({
        type: Number,
        required: true,
        example: 1,
        description: "사용자 인덱스",
    })
    id: number;

    constructor({
        email,
        password,
        gender,
        introduce,
        id
    }) {
        super({ email, password, gender, introduce })
        this.id = id;
    }
}