import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Index } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../item/item.entity";

@Entity('event')
export class Event {
    @PrimaryColumn('uuid')
    id: string = uuidv4();

    @Column()
    name: string;

    @Column()
    date: Date;

    @OneToMany(() => Item, (item) => item.event)
    items: Item[];
}