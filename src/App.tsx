import * as React from 'react'
import { TextField, IconButton, InputAdornment, FormHelperText, makeStyles, createStyles, Theme, MenuItem, Select } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { ITask } from './types/types';
import TasksLayout from './components/TasksLayout';
import './styles/App.css';
import SortingBar from './components/SortingBar';
import { makeid } from './utlis/makeid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const App = () => {
  const startTasks: ITask[] = [{
    content: 'Make a to-do list app',
    isCompleted: true,
    isHighPriority: true
  }, {
    content: 'Send solution',
    isCompleted: false,
    isHighPriority: false
  }]
  const [taskContent, setTaskContent] = React.useState('')
  const [tasks, setTasks] = React.useState(startTasks)
  const [sortingProperty, setSortingProperty] = React.useState('name')
  const [direction, setDirection] = React.useState('ASC')

  const addTask = () => {
    if(taskContent) {
      const task: ITask = {
        content: taskContent,
        isCompleted: false,
        isHighPriority: false
      }
      setTasks([...tasks, task])
    }
  }

  const handleDelete = (content: string) => {
    const filteredArr = tasks.filter(_t => _t.content !== content)
    setTasks([...filteredArr])
  }

  const handleComplete = (content: string) => {
    const newTasks = [...tasks]
    const index = newTasks.findIndex(task => task.content === content)
    newTasks[index].isCompleted = !tasks[index].isCompleted
    setTasks(newTasks)
  }

  const handlePriority = (content: string) => {
    const newTasks = [...tasks]
    const index = newTasks.findIndex(task => task.content === content)
    newTasks[index].isHighPriority = !tasks[index].isHighPriority
    setTasks(newTasks)
  }
  
  const isDuplicatedTask = taskContent 
    ? (tasks.some(_t => _t.content === taskContent)) 
    : false

  const isLongTask = taskContent 
  ? (taskContent.length > 100) 
  : false

  const completedNumber = tasks
    .filter(t => t.isCompleted)
    .length

  const classes = useStyles();

  const info = <div className='column is-full'>
    <h2>Current tasks</h2>
    <>
      {`There ${completedNumber === 1 ? `is` : `are`} 
      ${completedNumber > 0 ? completedNumber : 'no'} 
      completed from ${tasks.length} added task${tasks.length === 1 ? '' : 's'}.`}
    </>
</div>
  console.log()
  const handleDirection = async () => {
    const newDirection = direction === 'ASC' ? 'DESC' : 'ASC'
    await setDirection(newDirection)
    sorting()
  }

  const handleSortingProperty = (property: string) => {
    setSortingProperty(property)
    sorting()
  }

  const sorting = () => {
    const newTasks: ITask[] = [...tasks]
    console.log('direction::: ', direction)
    console.log('sortingProperty::: ', sortingProperty)

    if(direction === 'ASC') {
      if(sortingProperty === 'name') {
        newTasks.sort((a, b) => a.content > b.content ? 1 : -1)
      } else {
        newTasks.sort((a, b) => a.isHighPriority === b.isHighPriority 
          ? 0 
          : a.isHighPriority 
            ? 1
            :-1)
      }
    } 

    if(direction === 'DESC') {
      if(sortingProperty === 'name') {
        newTasks.sort((a, b) => a.content > b.content ? -1 : 1)
      } else {
        newTasks.sort((a, b) => a.isHighPriority === b.isHighPriority 
          ? 0 
          : a.isHighPriority 
            ? -1
            : 1)
      }
    }
    
    setTasks(newTasks)   
  }

  return (
    <div className="App columns is-centered">
      <div className='column  is-4 is-8-offset is-main'>
        <div className='columns is-multiline is-variable is-2 '>
          <div className='column is-full'> 
            <h1>To Do List</h1>
          </div>
          <div className='column is-full'> 
            <h2>Add a new task to your list</h2>
            <TextField 
              className={classes.root}
              label='New task' 
              variant='outlined'
              error={isLongTask}
              onChange={e => setTaskContent(e.target.value)}
              color='secondary'
              disabled={tasks.length >= 10}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!isLongTask && !isDuplicatedTask && (
                      <IconButton 
                        onClick={addTask} 
                        color='inherit'
                      >
                      <AddIcon />
                    </IconButton>
                    )}
                  </InputAdornment>
                )
              }}
              /> 
              {isLongTask && (
              <FormHelperText error>
                This task description is longer 100 characters.
              </FormHelperText>
              )}
              {tasks.length >= 10 && (
              <FormHelperText>
                Enough tasks for the day! Take a rest. 
              </FormHelperText>
              )}
          </div>
          {tasks.length > 0 && info}
          <div className='column is-full'>
            {/* <SortingBar 
              disabled={tasks.length < 2}
              handleDirection={handleDirection}
              direction={direction}
              sortingProperty={sortingProperty}
              handleSortingProperty={handleSortingProperty}
            /> */}
            <div className='columns is-variable is-2 is-vcentered'>
            <div className='column'>Sort by:</div>
            <div className='column is-pulled-left is-3'>
              <Select
                className={classes.root}
                value={sortingProperty}
                onChange={(e) => handleSortingProperty(e.target.value as string)}
                MenuProps={{ disableScrollLock: true}}
                disabled={tasks.length < 2}
                color='secondary'
              >
                <MenuItem value={'name'} key={makeid()}>name</MenuItem>
                <MenuItem value={'priority'} key={makeid()}>priority</MenuItem>
              </Select>
            </div>
            <div className='column is-pulled-right is-1'>
              <IconButton 
                disabled={tasks.length < 2}
                onClick={handleDirection} 
                color='inherit'
                >
                {direction === 'DESC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
              </IconButton>
            </div>
          </div>
            {tasks.length > 0 &&
              <TasksLayout 
                tasks={tasks}
                onDelete={handleDelete}
                handleComplete={handleComplete}
                handlePriority={handlePriority}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      background: 'white',
      borderRadius: 8
    },
  }),
);

export default App;
