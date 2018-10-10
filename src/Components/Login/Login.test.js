
import React from 'react';
import Login from './Login';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('Login Component', () => {
    test('should render', () => {
      const wrapper = mount(<Login/> );
      expect(wrapper).toMatchSnapshot();
    })
})