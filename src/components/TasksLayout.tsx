import * as React from 'react'
import { ITask } from '../types/types';
import Task from './Task';
import { makeid } from '../utlis/makeid';

interface Props {
  tasks: ITask[]
  handleComplete: (content: string) => void
  onDelete: (content: string) => void 
}

const TasksLayout = (props: Props) => { 
  return (
    <div className='columns is-multiline is-variable is-2'>
      {props.tasks.map(_task => (
        <div className='column is-full is-task' key={makeid()}>
          <Task 
            task={_task}
            handleComplete={props.handleComplete}
            onDelete={props.onDelete}
          />
        </div>
      ))}
    </div>
  )
  }

export default TasksLayout