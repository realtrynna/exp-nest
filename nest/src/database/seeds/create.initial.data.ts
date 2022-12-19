import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { User } from "../../entities/User";
import { Profile } from "../../entities/Profile";

// 초기 데이터
// SeederFactoryManger => faker data
export default class UserSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);

        await userRepository.insert([
            {
                id: 1,
                email: "admin@admin.com",
                nickname: "관리자",
                password: "password",
            },
        ]);

        const profileRepository = dataSource.getRepository(Profile);

        await profileRepository.insert([
            {
                id: 1,
                gender: true,
                introduce: "자기소개",
            },
        ]);
    }
}
