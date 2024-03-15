import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_value: number;

  @Column()
  end_value: number;

  @Column()
  current_value: number;
}
