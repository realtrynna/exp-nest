import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

import { ProfileEntity } from "./profile.entity";
import { ArticleEntity } from "./articles.entity";

@Entity("User")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 50,
        nullable: false,
    })
    email: string;

    @Column({
        length: 10,
        nullable: false,
    })
    name: string;

    @Column({
        length: 255,
        nullable: false,
    })
    password: string;

    @Column({
        length: 255,
        nullable: true,
    })
    signUpVerifyToken: string;

    @OneToOne(() => ProfileEntity)
    @JoinColumn()
    profile: ProfileEntity;

    @OneToMany(() => ArticleEntity, (article) => article.user)
    articles: ArticleEntity[];
}
