import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate } from 'typeorm'
import { Status, Difficulty } from 'schemas/document'

@Entity('document')
export class Model {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  content!: string

  @Column('simple-enum', {
    enum: [Status.Todo, Status.Doing, Status.Backlog, Status.Done],
    default: Status.Todo
  })
  status!: Status

  @Column('boolean', { default: false })
  archived!: boolean

  @Column('simple-enum', {
    enum: [Difficulty.Low, Difficulty.Medium, Difficulty.High],
    default: Difficulty.Medium
  })
  difficulty!: Difficulty

  @Column('integer', { default: () => Date.now() })
  created_at!: number

  @Column('integer', { default: () => Date.now() })
  updated_at!: number

  @BeforeUpdate()
  updateDate() {
    this.updated_at = Date.now()
  }
}
