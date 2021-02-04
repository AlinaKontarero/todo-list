export type ITask = {
  content: string
  isHighPriority: boolean
  isCompleted: boolean
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}
