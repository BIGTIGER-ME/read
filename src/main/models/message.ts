import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('message')
export class MessageModel {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({ type: 'text', nullable: false })
  content: string | undefined
}
