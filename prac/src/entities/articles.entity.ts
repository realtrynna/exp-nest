import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { UserEntity } from "./users.entity";

@Entity("Article")
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false,
    })
    title: string;

    @Column({
        length: 255,
        nullable: false,
    })
    content: string;

    @Column({
        length: 255,
        nullable: true,
        default: null,
    })
    imageUrl: string;

    @ManyToOne(() => UserEntity, (user) => user.articles)
    user: UserEntity;
}
