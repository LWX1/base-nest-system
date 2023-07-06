import { Entity, Column, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  username!: string;

  @Column({
    default: '123456'
  })
  password!: string;

  @Column({
    name: 'role_id',
    nullable: true,
  })
  roleId!: number;

  @Column({ default: 1 })
  status!: number;

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