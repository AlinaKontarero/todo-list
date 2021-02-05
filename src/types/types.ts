export type ITask = {
  content: string
  isHighPriority: boolean
  isCompleted: boolean
}

export type Order = 'asc' | 'desc';

export type OrderBy = 'name' | 'priority'