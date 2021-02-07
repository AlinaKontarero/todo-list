import * as React from 'react'
import {shallow} from 'enzyme'
import { ITask } from '../types/types'
import Task from '../components/Task'

describe('Task', () => {
  const mockTask: ITask = {
      content: 'Test 1',
      isCompleted: true,
      isHighPriority: true};
   
  const taskComponent = <Task
    task={mockTask}
    onDelete={() => console.log('handleDelete')}
    handleComplete={() => console.log('handleComplete')}
    handlePriority={() => console.log('handlePriority')}
  />
  it('should render correctly', () => {
    const wrapper = shallow(taskComponent);
  })
  it("should render initial layout", () => {
    // when
    const component = shallow(taskComponent);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });
})