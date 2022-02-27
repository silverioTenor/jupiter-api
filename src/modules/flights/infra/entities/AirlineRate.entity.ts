import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Airline } from './Airline.entity';

@Entity('jp_airline_rate')
export class AirlineRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  flightId: string;

  @OneToOne(() => Airline)
  @JoinColumn({ name: 'flightId' })
  airline: Airline;

  @Column()
  economic: number;

  @Column()
  executive: number;

  @Column()
  premium: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
