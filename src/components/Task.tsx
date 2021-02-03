import * as React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip, IconButton, Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
// import Chip from '../components/Chip'
import { Zoom } from '@material-ui/core';
// import Loading from '../components/Loading';
// import { IconName } from '@fortawesome/free-solid-svg-icons';
import { ITask } from '../types/types';



interface Props {
  task: ITask
  handleComplete: (content: string) => void
  onDelete: (content: string) => void 
}

class Task extends React.Component<Props, never> { 
  render() {
    const { task, handleComplete, onDelete } = this.props

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
          <div className='column'>
            {/* <FontAwesomeIcon icon={["fas", task.isHightPriority ? 'fa arrow-up' : 'fa arrow-down' ]} size='lg' /> */}
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