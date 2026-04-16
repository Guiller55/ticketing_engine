import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Index, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "../user/user.entity";
import { Item } from "../item/item.entity";

@Entity('reservation')
export class Reservation {
    @PrimaryColumn('uuid')
    id: string = uuidv4();

    @Column('decimal', { precision: 10, scale: 2 })
    total_price: number;

    @Column()
    expires_at: Date;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @OneToOne(() => Item, (item) => item.reservation)
    @JoinColumn()
    item: Item;
}