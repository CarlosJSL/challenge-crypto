import React from 'react';
import DashboardTrade from './DashboardTrade';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardTrade component', () => {
    test('should render', () => {

      const user = { 
        name:"Carlos José", 
        email:"carlos@gmail.com", 
        password:"123456",  
        wallet:{ 
            hash: 'djcv98234y', 
            real_value: 100000.00, 
            bitcoin_value: 0 , 
            brita_value: 0 
        }
      };

      window.localStorage.setItem('user', JSON.stringify(user));

      const wrapper = mount(<DashboardTrade user = {user.wallet} transactions = {[]}/> );
      expect(wrapper).toMatchSnapshot();
    })
})