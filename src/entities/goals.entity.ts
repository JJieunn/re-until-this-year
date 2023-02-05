import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "./users.entity";


@Entity('goals')
export class Goals {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  user_id!: number;

  @Column("varchar", { length: 32 })
  goal!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @ManyToOne(() => Users, (user) => user.goals, {onDelete: 'CASCADE'} )
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user!: Users;
}