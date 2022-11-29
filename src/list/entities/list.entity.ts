import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class List {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 254,
  })
  name: string;

  @Column({ select: true, comment: '注释', nullable: true })
  password: string;

  @Column()
  age: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  top: number;
}
