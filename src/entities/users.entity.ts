import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Fortunes } from "./fortune.entity";
import { Goals } from "./goals.entity";


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column("varchar", { length: 9 })
  nickname!: string;

  @Column("varchar", { unique: true, length: 55 })
  email!: string;

  @Column("int")
  fortune_id!: number;

  @Column("varchar", {length: 400, nullable: true })
  image!: string;

  @Column("boolean", { default: false })
  opt_in!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;

  @OneToMany(() => Goals, (goal) => goal.user, { cascade: true })
  goals!: Goals[];

  @ManyToOne(() => Fortunes, (fortune) => fortune.users)
  @JoinColumn({ name: "fortune_id", referencedColumnName: 'id' })
  fortune!: Fortunes;
}