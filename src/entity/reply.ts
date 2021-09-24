import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  intent: string;

  @Column()
  reply: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
