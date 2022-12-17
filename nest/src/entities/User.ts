import {
    Index,
    Entity,
    Column,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
} from "typeorm";

import { BaseEntity } from "./base.entity";
import { Post } from "./Post"; 
import { Profile } from "./Profile";

// 사용자
@Index("email", ["email"], { unique: true })
@Entity({
    schema: "practice",
    name: "user",
    orderBy: {
        email: "ASC",
        id: "DESC",
    }
})
export class User extends BaseEntity {
    @Column("varchar", { name: "email", unique: true, length: 30 })
    email: string;

    @Column("varchar", { name: "nickname", length: 10 })
    nickname: string;
    
    @Column("varchar", { name: "password", length: 255, select: false })
    password: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToOne(type => Profile, (profile) => profile.user)
    profile: Profile;
}