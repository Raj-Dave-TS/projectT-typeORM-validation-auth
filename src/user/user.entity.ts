import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
