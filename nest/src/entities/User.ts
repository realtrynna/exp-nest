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
} from "typeorm";

// 
@Index("email", ["email"], { unique: true })
@Entity({ schema: "practice", name: "user"})
export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "email", unique: true, length: 30 })
    email: string;

    @Column("varchar", { name: "nickname", length: 10 })
    nickname: string;
    
    @Column("varchar", { name: "password", length: 255, select: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}