import { Entity, Column, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class RoleMenu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'role_id',
  })
  roleId!: number;

  @Column({
    name: 'menu_ids',
    comment: '菜单ids集合',
  })
  menuIds!: string;

  @Column({
    name: 'menu_parent_ids',
    comment: '菜单ids集合包括父级',
  })
  menuParentIds!: string;

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