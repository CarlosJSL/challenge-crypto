import React, { Component } from 'react'
import './LoginForm.css';
import { getAllDataOnDB, putValueOnDB } from '../../../utils/connectDatabase';
import md5 from 'md5';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          name:'',
          email: '',
          password: '',
          showRegisterForm:  false,
          errors: [],
          registerClass:'none',
          loginClass: 'inherit'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({...this.state,[event.target.id]: event.target.value});
    }

    validateForm() {
        const errors = [];
        // eslint-disable-next-line
        const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (this.state.showRegisterForm && (!this.state.password.length || !this.state.email.length || !this.state.name)) {
            errors.push("Os campos não podem estar vazios");
            return errors;
        }

        if (!this.state.password.length || !this.state.email.length ) {
            errors.push("Os campos não podem estar vazios");
            return errors;
        }   

        if (!emailPattern.test(String(this.state.email).toLowerCase())) {    
            errors.push("O email está em formato inválido");
        }

        if (this.state.password.length < 6) {    
            errors.push("A senha precisa conter no minimo 6 digitos");
        }

        return errors;
    }

    async signUp(){
        try {
            const newUser = {
                ...this.state
            };

            delete newUser['errors'];
            delete newUser['showLoginForm'];
            
            if (!this.validateForm().length) {
                const users = await getAllDataOnDB("user"); 
                if(users.find(user => user.email === newUser.email)) {
                    this.setState({...this.state, errors: ['Usuário já está cadastrado']});

                } else {
                    newUser.wallet = { hash: md5(newUser.email), real_value: "100000.00", bitcoin_value: "0.00000000", brita_value: "0.00" };
                    await putValueOnDB(newUser,newUser.email,"user");

                    window.localStorage.setItem("user", JSON.stringify(newUser));
                    this.props.router.history.push('/dashboard');
                }
            } else {
                this.setState({...this.state, errors: this.validateForm()});
            }            
        } catch (error) {
            console.error(error);
        }
    }

    async doLogin()   {
        try {
            
            if(!this.validateForm().length){
                const { email , password } = this.state;
                const users = await getAllDataOnDB("user");  
                const user = users.filter(user => user.email === email && user.password === password);

                if (user.length) {
                    window.localStorage.setItem("user", JSON.stringify(user[0]));
                    this.props.router.history.push('/dashboard') ;
                 } else { 
                    this.setState({...this.state, errors: ['Usuário ou senha inválidos']});
                 } 

            } else {
                this.setState({...this.state, errors: this.validateForm()});
            }

        } catch (error) {
            console.error(error);
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.state.showRegisterForm ? this.signUp() : this.doLogin();
    }

    render() {
            return (
                <form className="ui form center" onSubmit={this.handleSubmit}>
                    <div className= "field" style = {{display:this.state.registerClass}}>
                        <label>Name</label>
                        <input type="text" id="name" placeholder="Nome" value={this.state.name} onChange={this.handleChange}></input>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="text" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
                    </div>
                        {
                            this.state.errors.map((error,index) => {
                                return(
                                    <p className= "error" key={index}>{error}</p>
                                )
                            })
                        }
                    <div style = {{display:this.state.loginClass}}>
                        <p id="register">Você não está cadastrado ainda?  
                            <a href = 'javascript:void(0)' 
                                onClick={()=> this.setState({
                                                        errors:[],
                                                        showRegisterForm: true, 
                                                        registerClass:'inherit',
                                                        loginClass:'none', 
                                                        email:'', 
                                                        password:'', 
                                                        name:''
                                                    })}>  
                                    Cadastre-se aqui!
                            </a>
                        </p>
                        <button className="ui positive button" type="submit">Sign in</button>
                    </div>
                    <div style = {{display:this.state.registerClass}} >
                        <p id="register">Você já está cadastrado?
                            <a href = 'javascript:void(0)'
                                onClick={()=> this.setState({
                                                        errors:[],
                                                        showRegisterForm: false, 
                                                        registerClass:'none', 
                                                        loginClass:'inherit',
                                                        email:'', 
                                                        password:'', 
                                                        name:''
                                                    })}>  
                                    Faça seu login aqui!
                            </a>
                        </p>
                        <button className="ui positive button" type="submit">Sign up</button>
                    </div>
                </form>
            )
        } 
}


