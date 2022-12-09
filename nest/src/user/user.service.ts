import { Injectable } from "@nestjs/common";

import { SignUpDto } from "./dtos/index";

@Injectable()
export class UserService {
    getUser() {}

    signUp({ email, password, gender }: SignUpDto) {
        return {
            email,
            password,
            gender,
        };
    }

    signIn() {}
}
