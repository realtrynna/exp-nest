import { Injectable } from '@nestjs/common';

import { SignUpDto } from "./dto/index";

@Injectable()
export class UserService {
    getUser() {
        
    }

    signUp({ email, password, gender }: SignUpDto) {
        
    }

    signIn() {
        
    }
}
