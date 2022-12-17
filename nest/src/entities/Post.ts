import {
    PrimaryGeneratedColumn,
    Index,
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./User";

// 포스트
@Entity({ schema: "practice", name: "post" })
export class Post extends BaseEntity {
    @Column("varchar", { name: "title", length: 100 })
    title: string;

    @Column("varchar", { name: "content", length: 255 })
    content: string;

    @Column("varchar", { name: "imageUrl", nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    // 외래키 컬럼명 직접 지정
    @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
    user: User;
}
