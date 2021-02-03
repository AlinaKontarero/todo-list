import * as React from 'react'
import { Tooltip, IconButton, Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Zoom } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { ITask } from '../types/types';


interface Props {
  task: ITask
  onDelete: (content: string) => void 
  handleComplete: (content: string) => void
  handlePriority: (content: string) => void
}

class Task extends React.Component<Props, never> { 
  render() {
    const { task, handleComplete, onDelete, handlePriority } = this.props

    return (
        <div className='columns is-variable is-2 is-vcentered'>
          <div className='column is-narrow'>
            <Checkbox 
              value={task.content}
              checked={task.isCompleted}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleComplete(e.target.value)}
            />
          </div>
          <div className='column'>
            {task.content}
          </div>
          <div className='column is-narrow'>
          <Tooltip title='Priority' TransitionComponent={Zoom} arrow={true} placement={'top'}>
            <IconButton 
              onClick={() => handlePriority(task.content)} 
              color='inherit'
              >
              {task.isHighPriority ? <ArrowUpwardIcon /> : <ArrowDownwardIcon /> }
            </IconButton>
          </Tooltip>
          </div>
          <div className='column is-narrow is-pulled-right'>
          <Tooltip title='Close' TransitionComponent={Zoom} arrow={true} placement={'top'}>
            <IconButton 
              onClick={() => onDelete(task.content)} 
              color='inherit'
              >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </div>
        </div>
    )
  }
}

export default Task