import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmailService } from "src/email/email.service";
import { createUserDto, VerifyEmailDto, LoginDto, UserMeta } from "./dto";
import { UserEntity } from "./entities/users.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly emailService: EmailService,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async findUserById(userId: number) {
        return;
    }

    async createUser({ email, name, password, gender }: createUserDto) {
        return;
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto) {
        console.log("서비스 실행");
        return;
    }

    async login(loginDto: LoginDto) {
        console.log(loginDto);
        return;
    }
}
