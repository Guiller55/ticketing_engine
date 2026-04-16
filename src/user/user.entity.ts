import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Index } from "typeorm";
import { Reservation } from "../reservation/reservation.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Index({ unique: true })
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password_hash: string;    

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}