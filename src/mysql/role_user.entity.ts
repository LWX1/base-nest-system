import { Entity, Column, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class RoleUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role_id!: number;

  @Column()
  user_id!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time!: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  update_time!: Timestamp;
}