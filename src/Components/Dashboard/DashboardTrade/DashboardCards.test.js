import React from 'react';
import DashboardCards from './DashboardCards';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { getUserTransactions, chargeDB } from '../../../utils/connectDatabase';
import indexedDB from 'fake-indexeddb';

Enzyme.configure({ adapter: new Adapter() });
window.indexedDB =  indexedDB;

describe('componentDidMount method', () => {
    test('Should change the state ', async () => {
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();
        
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
        }
        window.localStorage.setItem('user', JSON.stringify(user));
        await chargeDB();

        await instance.componentDidMount();
        
        expect(instance.state.cryptos[0].name).toEqual('bitcoin');
        expect(typeof instance.state.cryptos[0].buy).toEqual('string');
        expect(typeof instance.state.cryptos[0].sell).toEqual('string');
        expect(instance.state.cryptos[0].symbol).toEqual('฿');

        expect(instance.state.cryptos[1].name).toEqual('brita');
        expect(typeof instance.state.cryptos[1].buy).toEqual('number');
        expect(typeof instance.state.cryptos[1].sell).toEqual('number');
        expect(instance.state.cryptos[1].symbol).toEqual('$');

        expect(instance.state.userCryptoAmounts.hash).toEqual(user.wallet.hash);
        expect(instance.state.userCryptoAmounts.real_value).toEqual(user.wallet.real_value);
        expect(instance.state.userCryptoAmounts.bitcoin_value).toEqual(user.wallet.bitcoin_value);
        expect(instance.state.userCryptoAmounts.brita_value).toEqual(user.wallet.brita_value);
    },11000)
})


describe('changeAmount method',() => {
    test('Should not pass the trade', async () => {
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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

        const event = {
            target:{
                value: 100
            }
        };

        window.localStorage.setItem('user', JSON.stringify(user));
        await chargeDB();

        await instance.componentDidMount();
        
        instance.state.cryptoFocus = {
            buy: instance.state.cryptos[0].buy
        };

        instance.changeAmount(event);
        expect(instance.state.error).toEqual('Você não tem dinheiro suficiente para essa compra');
        expect(instance.state.enableButton).toEqual('ui teal labeled icon disabled button');
    })

    test('Should pass the trade', async () => {
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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
        }
        const event = {
            target:{
                value: 1
            }
        }
        
        window.localStorage.setItem('user', JSON.stringify(user));
        await chargeDB();
        await instance.componentDidMount();
        
        instance.state.cryptoFocus = {
            buy: instance.state.cryptos[0].buy
        };

        instance.changeAmount(event);
        expect(instance.state.error).toEqual('');
        expect(instance.state.enableButton).toEqual('ui teal labeled icon button');

    })
})


describe('changeAmountSell method',() => {
    test('Should not pass the trade', async () => {
        
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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
        
        const event = {
            target:{
                value: 1
            }
        };

        window.localStorage.setItem('user', JSON.stringify(user));
        await chargeDB();

        await instance.componentDidMount();
        
        instance.state.cryptoFocus = {
            name: 'bitcoin',
            sell: instance.state.cryptos[0].sell
        };

        instance.changeAmountSell(event);
        expect(instance.state.error).toEqual('Você não tem dinheiro suficiente para essa venda');
        expect(instance.state.enableButton).toEqual('ui teal labeled icon disabled button');
    })

    test('Should pass the trade', async () => {
        
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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
        
        const event = {
            target:{
                value: 1
            }
        };

        window.localStorage.setItem('user', JSON.stringify(user));
        await chargeDB();

        await instance.componentDidMount();
        instance.state.userCryptoAmounts.bitcoin_value = 1;
        instance.state.cryptoFocus = {
            name: 'bitcoin',
            sell: instance.state.cryptos[0].sell
        };

        instance.changeAmountSell(event);
        expect(instance.state.error).toEqual('');
        expect(instance.state.enableButton).toEqual('ui teal labeled icon button');
    })
})

describe('makeTransaction method',() => {
    test('Should make a buy transaction', async () => {
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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

        instance.state.userCryptoAmounts = user.wallet;
        instance.state.cryptoFocus.name = 'bitcoin';
        instance.state.quantity = 1;
        instance.state.real_amount = 30000;

        await instance.makeTransaction('buy');

        const transactions = await getUserTransactions('transactions');
        expect(transactions[0].wallet.hash).toEqual(user.wallet.hash);
    })

    test('Should make a sell transaction', async () => {
        const wrapper = mount(<DashboardCards />);
        const instance = wrapper.instance();

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

        instance.state.userCryptoAmounts = user.wallet;
        instance.state.cryptoFocus.name = 'bitcoin';
        instance.state.quantity = 1;
        instance.state.real_amount = 30000;
        instance.state.crypto_amount = 1;
        await instance.makeTransaction('sell');

        const transactions = await getUserTransactions('transactions');
        expect(transactions[1].wallet.hash).toEqual(user.wallet.hash);
    })
})

describe('DashboardCards Component', () => {
    test('should render', () => {
      const wrapper = mount(<DashboardCards userCryptoAmount = {{real_value:10000,bitcoin_value:0,brita_value:0}}/> );
      expect(wrapper).toMatchSnapshot();
    })
})