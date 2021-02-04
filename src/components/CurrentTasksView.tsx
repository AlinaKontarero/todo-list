import * as React from 'react'
import { IconButton, MenuItem, Select } from '@material-ui/core'
import { ITask , Direction } from '../types/types';
import { makeid } from '../utlis/makeid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TasksLayout from './TasksLayout';

interface Props {
  tasks: ITask[]
  handleDelete: (content: string) => void 
  handleComplete: (content: string) => void
  handlePriority: (content: string) => void
  setTasks: (tasks: ITask[]) => void
}

interface State {
  sortingProperty: string
  direction: Direction
  sortedTasks: ITask[]
}

class CurrentTasksView extends React.Component<Props, State> { 
  constructor(props: Props) {
    super(props)
    this.state = {
      sortingProperty: 'name',
      direction: Direction.ASC,
      sortedTasks: this.props.tasks
    }
  }

  public componentDidMount() {
    this.onSort()
  }

  private onSort = () => {
    const newTasks  = this.props.tasks;
    const isNameSorting = this.state.sortingProperty === 'name'
    if(this.state.direction === Direction.ASC) {
      if(isNameSorting) {
        newTasks.sort((a, b) => a.content > b.content ? 1 : -1)
      } else {
        newTasks.sort((a, b) => a.isHighPriority === b.isHighPriority 
          ? 0 
          : a.isHighPriority 
            ? 1
            :-1)
      }
    } 

    if(this.state.direction === Direction.DESC) {
      if(isNameSorting) {
        newTasks.sort((a, b) => a.content > b.content ? -1 : 1)
      } else {
        newTasks.sort((a, b) => a.isHighPriority === b.isHighPriority 
          ? 0 
          : a.isHighPriority 
            ? -1
            : 1)
      }
    }
    
    this.props.setTasks(newTasks)  
  }


  private handleSortingProperty = (e: string) => {
    this.setState({ sortingProperty: e })
    this.onSort()
  }

  private handleDirection = () => {
    this.setState({ direction: this.state.direction === Direction.ASC ? Direction.DESC : Direction.ASC })
    this.onSort()
  }

  render() {
    const disabledSorting = this.props.tasks.length < 2
    const completedNumber = this.props.tasks
    .filter(t => t.isCompleted)
    .length

    const info = <>
      <h2>Current tasks</h2>
      <>
        {`There ${completedNumber === 1 ? `is` : `are`} 
        ${completedNumber > 0 ? completedNumber : 'no'} 
        completed from ${this.props.tasks.length} added task${this.props.tasks.length === 1 ? '' : 's'}.`}
      </>
  </>


    return (
      <div className='columns is-multiline'>
        <div className='column is-full'>
        {this.props.tasks.length > 0 && info}
        <div className='columns is-variable is-2 is-vcentered'>
          <div className='column'>Sort by:</div>
            <div className='column is-pulled-right is-3'>
              <Select
                autoWidth={true}
                value={this.state.sortingProperty}
                onChange={(e) => this.handleSortingProperty(e.target.value as string)}
                MenuProps={{ disableScrollLock: true}}
                disabled={disabledSorting}
                color='secondary'
              >
                <MenuItem value={'name'} key={makeid()}>name</MenuItem>
                <MenuItem value={'priority'} key={makeid()}>priority</MenuItem>
              </Select>
            </div>
          <div className='column is-pulled-right is-1'>
            <IconButton 
              disabled={disabledSorting}
              onClick={this.handleDirection} 
              color='inherit'
              >
              {this.state.direction === 'DESC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
            </IconButton>
          </div>
        </div>
      </div>
      <div className='column is-full'>
        <TasksLayout 
          tasks={this.props.tasks}
          onDelete={this.props.handleDelete}
          handleComplete={this.props.handleComplete}
          handlePriority={this.props.handlePriority}
          />
        </div>
      </div>
    )
  }
}

export default CurrentTasksView