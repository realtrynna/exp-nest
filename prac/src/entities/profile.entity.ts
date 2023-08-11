import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Profile")
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 10,
        nullable: false,
    })
    gender: string;

    @Column({
        length: 255,
        nullable: true,
        default: null,
    })
    photo: string;
}
