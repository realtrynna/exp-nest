import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'typeorm';
import { User } from "./User";
import { Channel } from 'diagnostics_channel';

Entity({ schema: "practice", name: "workspace" })
export class Workspace extends BaseEntity {
    @Column("varchar", { name: "title", unique: true, length: 30 })
    title: string;

    @Column("varchar", { name: "url", unique: true, length: 30 })
    url: string;

    @Column("int", { name: "OwnerId", nullable: true })
    OwnerId: number | null;

    @OneToMany(() => Channel, (channel) => channel.workspace)
    channels: Channel[];
}