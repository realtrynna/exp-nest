import { ApiProperty } from "@nestjs/swagger";

import { SignUpDto } from "src/user/dtos";

export class UserDto extends SignUpDto {
    id: number;

    constructor({ email, password, gender, introduce, id }) {
        super({ email, password, gender, introduce });
        this.id = id;
    }
}
