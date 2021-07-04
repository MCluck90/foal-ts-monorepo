import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryColumn()
  id: string

  @Column()
  text: string

  @Column()
  done: boolean
}
