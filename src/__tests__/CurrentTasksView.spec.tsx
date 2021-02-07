import * as React from 'react'
import {shallow} from 'enzyme'
import CurrentTasksView from '../components/CurrentTasksView'
import { ITask } from '../types/types'

describe('CurrentTasksView', () => {
  const mockTasks: ITask[] = [
    {
      content: 'Test 1',
      isCompleted: true,
      isHighPriority: true},
    {
      content: 'Test 2',
      isCompleted: false,
      isHighPriority: false
    }
  ]
  const currentTasksViewComponent = <CurrentTasksView 
    tasks={mockTasks}
    handleDelete={() => console.log('handleDelete')}
    handleComplete={() => console.log('handleComplete')}
    handlePriority={() => console.log('handlePriority')}
  />
  it('should render correctly', () => {
    const wrapper = shallow(currentTasksViewComponent);
  })
  it("should render initial layout", () => {
    // when
    const component = shallow(currentTasksViewComponent);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });
})

