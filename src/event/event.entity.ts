import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Index } from "typeorm";
import { Item } from "../item/item.entity";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    date: Date;

    @OneToMany(() => Item, (item) => item.event)
    items: Item[];
}