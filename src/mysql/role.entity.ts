import { Entity, Column, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true
  })
  name!: string;
  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime!: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
  })
  updateTime!: Timestamp;
}