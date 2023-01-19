import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";

import { EmailService } from "src/email/email.service";
import { createUserDto, VerifyEmailDto, LoginDto, Profile } from "./dto";
import { UserEntity } from "../entities/users.entity";
import { ProfileEntity } from "src/entities/profile.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly emailService: EmailService,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private readonly dataSource: DataSource,
    ) {}

    async findUserById(userId: number) {
        // const queryRunner = this.dataSource.createQueryRunner();

        const user = await this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.profile", "profile")
            .getOne();

        return user;
    }

    async createUser({ email, name, password, gender }: createUserDto) {
        console.log("Gender", gender);
        const profile = new ProfileEntity();
        profile.gender = gender;
        await this.profileRepository.save(profile);

        const user = new UserEntity();
        user.email = email;
        user.name = name;
        user.password = password;
        user.profile = profile;
        await this.usersRepository.save(user);

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
