import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('message')
export class MessageModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: false })
  content!: string
}
