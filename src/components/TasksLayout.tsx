import * as React from 'react'
import { ITask } from '../types/types';
import Task from './Task';
import { makeid } from '../utils/makeid';

interface Props {
  tasks: ITask[]
  onDelete: (content: string) => void 
  handleComplete: (content: string) => void
  handlePriority: (content: string) => void
}

const TasksLayout = (props: Props) => { 
  return (
    <div className='columns is-multiline is-variable is-2'>
      {props.tasks.map(_task => (
        <Task 
          key={makeid()}
          task={_task}
          onDelete={props.onDelete}
          handleComplete={props.handleComplete}
          handlePriority={props.handlePriority}
        />
      ))}
    </div>
  )
  }

export default TasksLayout