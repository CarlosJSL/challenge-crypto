

import React from 'react';
import DashboardHeader from './DashboardHeader';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardHeader component', () => {
    test('should render', () => {

      const user = { 
        name:"Carlos José", 
        email:"carlos@gmail.com", 
        password:"123456",  
        wallet:{ 
            hash: 'djcv98234y', 
            real_value: "100000.00", 
            bitcoin_value: "0.00000000" , 
            brita_value: "0.00" 
        }
      };

      window.localStorage.setItem('user', JSON.stringify(user));

      const wrapper = mount(<DashboardHeader /> );
      expect(wrapper).toMatchSnapshot();
    })
})