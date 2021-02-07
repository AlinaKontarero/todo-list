import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';

describe("App", () => {
  it("should render App", () => {
    const wrapper = shallow(<App />);
  });
  
});