import React from 'react';
import LoginRegister from './LoginRegister';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme';
import indexedDB from 'fake-indexeddb';
import { chargeDB } from '../../../connectDatabase';

Enzyme.configure({ adapter: new Adapter() })
window.indexedDB =  indexedDB

beforeEach(() =>{
    window.localStorage.clear();
})
describe('validateForm method', () => {
    test('Should invalidate login because the input text fields are null ', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();

        expect(instance.validateForm()).toEqual(['Os campos não podem estar vazios' ]);
    });
    
    test('Should invalidate login because the email are incorrect', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        
        instance.setState({name:'carlos',email:'s',password:'123456'})
        expect(instance.validateForm()).toEqual(['O email está em formato inválido']);
    });

    test('Should invalidate login because the password is minimun', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        
        instance.setState({name:'carlos', email:'s@s.com',password:'12345'})
        expect(instance.validateForm()).toEqual(['A senha precisa conter no minimo 6 digitos']);
    });

    test('Should invalidate login because the password and email are invalid', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        
        instance.setState({name:'carlos', email:'s.com',password:'12345'})
        expect(instance.validateForm()).toEqual(['O email está em formato inválido','A senha precisa conter no minimo 6 digitos']);
    });
})

describe('handleChange method', () => {
    test('Should change the state', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        const event = {
            target: {
                id:'email',
                value: 'carlos@gmail.com'
            }
        }

        instance.handleChange(event)
        expect(instance.state.email).toEqual('carlos@gmail.com');
    })
})

describe('doRegister method', () => {
    test('Should not register because the data form is invalid', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        instance.setState({email:'teste',password:'teste'})

        expect(instance.validateForm().lenght).not.toBe(0);
    })
})

describe('doRegister method', () => {
    test('Should not register because the data form is invalid', () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        instance.setState({name:'carlos',email:'teste',password:'teste'})

        expect(instance.validateForm().lenght).not.toBe(0);
    })
})


describe('doRegister method', () => {
    test('Should do not register because the user already registered', async () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();
        await chargeDB();
        
        instance.setState({name:'carlos jose',email:'carlos@gmail.com',password:'123456'});
        
        await instance.signUp();
        
        expect(instance.state.errors).toEqual(['Usuário já está cadastrado']);
        
    })
})

describe('doRegister method', () => {
    test('Should do register', async () => {
        const wrapper = mount(<LoginRegister/>);
        const instance = wrapper.instance();

        instance.setState({name:'carlos jose',email:'teste@gmail.com',password:'123456'});
        await instance.signUp();
        
        expect(JSON.parse(window.localStorage.getItem("user")).name).toEqual(instance.state.name)
        expect(JSON.parse(window.localStorage.getItem("user")).email).toEqual(instance.state.email)
        expect(JSON.parse(window.localStorage.getItem("user")).password).toEqual(instance.state.password)
        expect(JSON.parse(window.localStorage.getItem("user")).wallet.real_value).toEqual(100000)
        
    })
})