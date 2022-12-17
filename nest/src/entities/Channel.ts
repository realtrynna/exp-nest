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
import { Workspace } from './Workspace';

Entity({ schema: "practice", name: "channel" })
export class Channel extends BaseEntity {
    @Column("varchar", { name: "title", unique: true, length: 30 })
    title: string;

    @Column("tinyint", { name: "private", nullable: true, width: 1, default: "'0'"})
    private: boolean | null;

    @Column("int", { name: "WorkspaceId", nullable: true })
    WorkspaceId: number | null;

    @ManyToOne(() => Workspace, (workspace) => workspace.channels, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "WorkspaceId", referencedColumnName: "id" }])
    workspace: Workspace;
}