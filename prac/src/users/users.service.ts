import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";

import { EmailService } from "src/email/email.service";
import { CreateUserDto, VerifyEmailDto, LoginDto } from "./dto";
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
        // const user = await this.dataSource
        //     .getRepository(UserEntity)
        //     .createQueryBuilder("user")
        //     .leftJoinAndSelect("user.profile", "profile")
        //     .getOne();
        // return user;
    }

    async createUser({ email, name, password, gender }: CreateUserDto) {
        const connection = this.dataSource;
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const profile = await this.profileRepository.create({
                gender,
            });

            await queryRunner.manager.save(profile);

            const user = await this.usersRepository.create({
                email,
                name,
                password,
            });

            user.profile = profile;

            await queryRunner.manager.save(user);

            await queryRunner.commitTransaction();

            return user;
        } catch (err) {
            await queryRunner.rollbackTransaction();

            throw Error("");
        } finally {
            await queryRunner.release();
        }
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
