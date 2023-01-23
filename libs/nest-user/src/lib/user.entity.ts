import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ nullable: true, length: 200 })
  test: string;
}
