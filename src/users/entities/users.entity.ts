import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("User")
export class UserEntity {
    @PrimaryColumn()
    id: string;

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
}
