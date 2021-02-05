import * as React from 'react'
import { IconButton, MenuItem, Select } from '@material-ui/core'
import { ITask, OrderBy, Order } from '../types/types';
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
  orderBy: OrderBy
  order: Order
}

class CurrentTasksView extends React.Component<Props, State> { 
  constructor(props: Props) {
    super(props)
    this.state = {
      orderBy: 'name',
      order: 'asc'
    }
  }

  private descendingComparator = (a: string | boolean, b: string | boolean): number => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }

  private getComparator = (a: any, b: any) => {
    return this.state.order === 'desc'
      ? this.descendingComparator(a, b)
      : -this.descendingComparator(a, b);
  }

  private onSorting = () => {
    let newArr = this.props.tasks;
    if(this.state.orderBy === 'name') {
      newArr.sort((first: ITask, second: ITask) => {
        return this.getComparator(first.content, second.content)
      })
    }

    if(this.state.orderBy === 'priority') {
      newArr.sort((first: ITask, second: ITask) => {
        return this.getComparator(first.isHighPriority, second.isHighPriority)
      })
    }

    return newArr
  }

  private handleOrderBy = (e: OrderBy) => {
    this.setState({ orderBy: e })
  }

  private handleDirection = () => {
    this.setState({ order: this.state.order === 'asc' ? 'desc' : 'asc' })
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

    const tasks = this.onSorting()

    return (
      <div className='columns is-multiline'>
        <div className='column is-full'>
        {this.props.tasks.length > 0 && info}
        <div className='columns is-variable is-2 is-vcentered'>
          <div className='column'>Sort by:</div>
            <div className='column is-pulled-right is-3'>
              <Select
                autoWidth={true}
                value={this.state.orderBy}
                onChange={(e) => this.handleOrderBy(e.target.value as OrderBy)}
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
              {this.state.order === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
            </IconButton>
          </div>
        </div>
      </div>
      <div className='column is-full'>
        <TasksLayout 
          tasks={tasks}
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