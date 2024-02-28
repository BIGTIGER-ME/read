import { JSONContent } from '@tiptap/core'

export enum Status {
  Todo = 'todo',
  Doing = 'doing',
  Backlog = 'backlog',
  Done = 'done'
}

export enum Difficulty {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export interface IDocumentDBSchema {
  id: number
  content: string
  status: Status
  archived: boolean
  difficulty: Difficulty
  created_at: number
  updated_at: number
}

export interface IDocumentUISchema
  extends Omit<IDocumentDBSchema, 'content' | 'created_at' | 'updated_at'> {
  content: JSONContent
  createdAt: number
  updatedAt: number
}

export type TDocumentUpdatableField = 'content' | 'status' | 'difficulty' | 'archived'
