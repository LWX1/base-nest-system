import { Entity, Column, PrimaryGeneratedColumn, Unique, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  url!: string;

  @Column({
    default: 0,
    name: 'parent_id',
    nullable: true,
  })
  parentId!: number;

  @Column({
    default: 'HomeFilled',
    nullable: true,
  })
  icon!: string;

  @Column({
    default: 1,
    comment: '1:菜单 2:功能',
  })
  type!: number;

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
  children!: Menu[];
}