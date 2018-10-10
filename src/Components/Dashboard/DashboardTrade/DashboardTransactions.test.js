import React from 'react';
import DashboardTransactions from './DashboardTransactions';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardTransactions component', () => {
    test('should render', () => {

      const wrapper = mount(<DashboardTransactions transactions = {[]}/> );
      expect(wrapper).toMatchSnapshot();
    })
})