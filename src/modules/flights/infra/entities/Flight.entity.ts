import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Airline } from './Airline.entity';

@Entity('jp_flight')
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  availableSeats: number;

  @Column()
  filledSeats: number;

  @Column()
  destination: string;

  @Column()
  departureDate: Date;

  @Column()
  arrivalDate: Date;

  @Column()
  hasStops: boolean;

  @Column()
  airlineId: string;

  @ManyToOne(() => Airline)
  @JoinColumn({ name: 'airLineId' })
  airLine: Airline;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
