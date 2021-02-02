import './styles/App.css';
import { TextField, IconButton, InputAdornment, FormHelperText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import Task from './components/Task';
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteIcon from '@material-ui/icons/Delete';
import { ITask } from './types/types';
import { makeid } from './utlis/makeid';

const App = () => {
  const [taskContent, setTaskContent] = React.useState('')
  const [tasks, setTasks] = React.useState([] as ITask[])

  const state = {
    task: {
      content: 'Hello',
      isHightPriority: true,
      isCompleted: true
    },
    handleComplete: () => console.log('complete'),
    onClose: () => console.log('delete')
  }

  const addTask = () => {
    if(taskContent) {
      const task: ITask = {
        content: taskContent,
        isCompleted: false,
        isHightPriority: false
      }

      setTasks([...tasks, task])
    }
  }

  const handleDelete = (content: string) => {
    const filteredArr = tasks.filter(_t => _t.content !== content)
    setTasks([...filteredArr])
    
  }

  const handleComplete = () => {
    console.log('com')
  }

  const isErrorTask = taskContent ? (taskContent.length > 255 || tasks.some(_t => _t.content === taskContent)) : false

  console.log("tasks:::", tasks )
  return (
    <div className="App">
      <div className='columns is-centered App'>
      <div className='column is-10 is-main'>
        <div className='columns is-multiline is-variable is-2 '>
          <div className='column is-full'> 
            <h1>To Do List</h1>
          </div>
          <div className='column is-full'> 
            <h2>Add a new task to your list:</h2>
            <TextField 
              label='New task' 
              variant='outlined'
              error={isErrorTask}
              onChange={e => setTaskContent(e.target.value)}
              color='secondary'
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
              <FormHelperText className='message-helper-text' error>
                This task description is longer 255 characters, or is has been already set.
              </FormHelperText>
              )}
          </div>
          <div className='column is-full'>
            There are 5 completed tasks from 10. 
          </div>
          {tasks.length > 0 && tasks.map((_t: ITask) => (
            <div className='column is-3 is-9-offset is-task' key={makeid()}>
              <Task 
                task={_t} 
                onDelete={handleDelete}
                handleComplete={handleComplete}
              />

            </div>
          ))}
          
        
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
