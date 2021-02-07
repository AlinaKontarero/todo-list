import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

describe("App", () => {
  it("should render App", () => {
    const wrapper = shallow(<App />);
  });
  
});