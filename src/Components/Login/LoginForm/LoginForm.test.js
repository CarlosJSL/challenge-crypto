import React from 'react';
import LoginForm from './LoginForm';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import indexedDB from 'fake-indexeddb';
import { chargeDB } from '../../../utils/connectDatabase';

Enzyme.configure({ adapter: new Adapter() });
window.indexedDB =  indexedDB;

beforeEach(() =>{
    window.localStorage.clear();
})

describe('validateForm method', () => {
    test('Should invalidate login because the input text fields are null ', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();

        expect(instance.validateForm()).toEqual(['Os campos não podem estar vazios' ]);
    });

    test('Should invalidate login because the email are incorrect', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        
        instance.setState({email:'s',password:'123456'})
        expect(instance.validateForm()).toEqual(['O email está em formato inválido']);
    });

    test('Should invalidate login because the password is minimun', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        
        instance.setState({email:'s@s.com',password:'12345'})
        expect(instance.validateForm()).toEqual(['A senha precisa conter no minimo 6 digitos']);
    });

    test('Should invalidate login because the password and email are invalid', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        
        instance.setState({email:'s.com',password:'12345'})
        expect(instance.validateForm()).toEqual(['O email está em formato inválido','A senha precisa conter no minimo 6 digitos']);
    });
})

describe('handleChange method', () => {
    test('Should change the state', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        const event = {
            target: {
                id:'email',
                value: 'carlos@gmail.com'
            }
        };

        instance.handleChange(event);
        expect(instance.state.email).toEqual('carlos@gmail.com');
    })
})

describe('doLogin method', () => {
    test('Should not login because the data form is invalid', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        instance.setState({email:'teste',password:'teste'});

        expect(instance.validateForm().lenght).not.toBe(0);
    })
})

describe('doLogin method', () => {
    test('Should not login because the data form is invalid', () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();
        instance.setState({email:'teste',password:'teste'});

        expect(instance.validateForm().lenght).not.toBe(0);
    })
})

describe('doLogin method', () => {
    test('Should do login', async () => {
        const wrapper = mount(<LoginForm/>);
        const instance = wrapper.instance();

        instance.setState({email:'carlos@gmail.com',password:'123456'});
        await chargeDB();
        await instance.doLogin();
        
        expect(JSON
                .parse(window.localStorage.getItem("user")
                ))
                .toEqual(   
                    {
                        "name":"Carlos José",
                        "email":"carlos@gmail.com",
                        "password":"123456",
                        "wallet":{
                                "hash":"djcv98234y",
                                "real_value":"100000.00",
                                "bitcoin_value":"0.00000000",
                                "brita_value":  "0.00"
                            }
                    }
                );
        
    })
})

describe('doLogin method', () => {
    test('Should not to do login because the user is not registered', async () => {

        const wrapper = mount(<LoginForm />);
        const instance = wrapper.instance();

        instance.setState({email:'teste@gmail.com',password:'123456'});
        await chargeDB();
        await instance.doLogin();
        
        expect(JSON.parse(window.localStorage.getItem("user"))).toBeNull();
        expect(instance.state.errors).toEqual(['Usuário ou senha inválidos']);
    })
})

describe('Login Component', () => {
    test('should render', () => {
      const wrapper = mount(<LoginForm/> );
      expect(wrapper).toMatchSnapshot();
    })
})