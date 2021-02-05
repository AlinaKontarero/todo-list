import * as React from 'react'
import { TextField, IconButton, InputAdornment, FormHelperText, makeStyles, createStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { ITask } from './types/types';
import CurrentTasksView from './components/CurrentTasksView';
import './styles/App.css';

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
    const index = newTasks.findIndex(task => task.content === content) | 0
    newTasks[index].isHighPriority = !tasks[index].isHighPriority
    setTasks(newTasks)
  }
  
  const isDuplicatedTask = taskContent 
    ? (tasks.some(_t => _t.content === taskContent)) 
    : false

  const isLongTask = taskContent 
  ? (taskContent.length > 100) 
  : false

  const classes = useStyles();
  
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
          <div className='column is-full'>
            <CurrentTasksView 
              tasks={tasks}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handlePriority={handlePriority}
              setTasks={setTasks}
            />
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
