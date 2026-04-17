import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Index, ManyToOne, OneToOne } from "typeorm";
import { Event } from "../event/event.entity"
import { Reservation } from "src/reservation/reservation.entity";

export enum ItemStatus {
    AVAILABLE = 'available',
    SOLD = 'sold',
    RESERVED = 'reserved',
}

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column({ type: 'enum', enum: ItemStatus, default: ItemStatus.AVAILABLE})
    status: ItemStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Event, (event) => event.items)
    event: Event;

    @OneToOne(() => Reservation, (reservation) => reservation.item)
    reservation: Reservation;
}