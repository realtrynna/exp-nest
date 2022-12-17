import {    
    Entity,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./User";

@Entity({ schema: "practice", name: "profile" })
export class Profile extends BaseEntity {
    @Column("boolean", { name: "gender" })
    gender: boolean;

    @Column("varchar", { name: "introduce", length: 100 })
    introduce: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: "UserId", referencedColumnName: "id" })
    user: User
}