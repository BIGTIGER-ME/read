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
  cover?: Buffer
  status: Status
  archived: boolean
  difficulty: Difficulty
  created_at: number
  updated_at: number
}

export interface IDocumentUISchema
  extends Omit<IDocumentDBSchema, 'content' | 'created_at' | 'updated_at' | 'cover'> {
  cover?: File
  content: JSONContent
  createdAt: number
  updatedAt: number
}

export interface IDocumentCreateDBSchema extends Pick<IDocumentDBSchema, 'content'> {
  cover?: Uint8Array
}

export interface IDocumentCreateUISchema extends Pick<IDocumentUISchema, 'content'> {
  cover?: File
}

export type TDocumentUpdatableField = 'content' | 'status' | 'difficulty' | 'archived'
