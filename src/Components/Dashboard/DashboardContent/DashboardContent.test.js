import React from 'react';
import DashboardContent from './DashboardContent';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { chargeDB } from '../../../utils/connectDatabase';
import indexedDB from 'fake-indexeddb';

Enzyme.configure({ adapter: new Adapter() });
window.indexedDB =  indexedDB;

describe('componentDidMount method', () => {
    test('Should change the state ', async () => {

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

        await chargeDB();

        const props = {
              userCryptoAmount: {
                  real_value: 100000,
                  bitcoin_value: 0,
                  brita_value: 0
              }
        };

        const wrapper = mount(<DashboardContent userCryptoAmount = {props.userCryptoAmount}/>);
        const instance = wrapper.instance();

        await instance.componentDidMount();

        expect(instance.state.userCryptoAmount.real_value).toEqual(user.wallet.real_value);
        expect(instance.state.userCryptoAmount.bitcoin_value).toEqual(user.wallet.bitcoin_value);
        expect(instance.state.userCryptoAmount.brita_value).toEqual(user.wallet.brita_value);
    })
})

describe('DashboardContent Component', () => {
    test('should render', () => {
      const wrapper = mount(<DashboardContent userCryptoAmount = {{real_value:10000,bitcoin_value:0,brita_value:0}}/> );
      expect(wrapper).toMatchSnapshot();
    })
})