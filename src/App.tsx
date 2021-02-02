import './styles/App.css';
import { TextField } from '@material-ui/core'
import Task from './components/Task';

function App() {

  const state = {
    task: {
      content: 'Hello',
      isHightPriority: true,
      isCompleted: true
    },
    handleComplete: () => console.log('complete'),
    onClose: () => console.log('delete')
  }
  return (
    <div className="App">
      <div className='columns is-centered App'>
      <div className='column is-10 is-main'>
        <div className='columns is-multiline is-variable is-2 '>
          <div className='column is-full'> 
            <h2>To Do List</h2>
          </div>
          <div className='column is-full'> 
            <TextField 
              label='New task' 
              variant='outlined'
              /> 
          </div>
          <div className='column is-full'>
            There are 5 completed tasks from 10. 
          </div>
          
          <Task {...state} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
