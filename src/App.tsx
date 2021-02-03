import * as React from 'react'
import { TextField, IconButton, InputAdornment, FormHelperText, makeStyles, createStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { ITask } from './types/types';
import TasksLayout from './components/TasksLayout';
import './styles/App.css';


const App = () => {
  const startTask: ITask = {
    content: 'Make a to-do list app',
    isCompleted: true,
    isHighPriority: true
  }
  const [taskContent, setTaskContent] = React.useState('')
  const [tasks, setTasks] = React.useState([startTask] as ITask[])

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
  
  const isErrorTask = taskContent 
    ? (taskContent.length > 255 || tasks.some(_t => _t.content === taskContent)) 
    : false

  const completedNumber = tasks
    .filter(t => t.isCompleted)
    .length

  const classes = useStyles();

  return (
    <div className="App columns is-centered">
      <div className='column  is-4 is-8-offset is-main'>
        <div className='columns is-multiline is-variable is-2 '>
          <div className='column is-full'> 
            <h1>To Do List</h1>
          </div>
          <div className='column is-full'> 
            <h2>Add a new task to your list:</h2>
            <TextField 
              className={classes.root}
              label='New task' 
              variant='outlined'
              error={isErrorTask}
              onChange={e => setTaskContent(e.target.value)}
              color='secondary'
              disabled={tasks.length > 10}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!isErrorTask && (
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
              {isErrorTask && (
              <FormHelperText error>
                This task description is longer 255 characters, or is has been already set.
              </FormHelperText>
              )}
              {tasks.length > 10 && (
              <FormHelperText>
                Enough tasks for the day! Take a rest. 
              </FormHelperText>
              )}
          </div>
          {tasks.length > 0 &&
            <div className='column is-full'>
            {`There ${completedNumber === 1 ? `is` : `are`} 
            ${completedNumber > 0 ? completedNumber : 'no'} 
            completed from ${tasks.length} added task${tasks.length === 1 ? '' : 's'}.`}
          </div>}
          <div className='column is-full'>
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
    },
  }),
);

export default App;
