import './styles/App.css';
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
      <div className='column is-10'>
        <div className='columns is-multiline is-variable is-2 '>
          <Task {...state} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
