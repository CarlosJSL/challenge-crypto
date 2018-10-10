import React, { Component } from 'react';
import {getAllDataOnDB,putValueOnDB} from '../../../utils/connectDatabase';
import LoginForm from '../LoginForm/LoginForm';
import md5 from 'md5';

export default class LoginRegister extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          name:'',
          email: '',
          password: '',
          showLoginForm:  false,
          errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({...this.state,[event.target.id]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.signUp();
    }

    validateForm() {
        const errors = [];
        // eslint-disable-next-line
        const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (!this.state.password.length || !this.state.email.length || !this.state.name.length ) {
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
            console.log(error);
        }
    }

    render() {
        if (!this.state.showLoginForm){
            return (
                <div className="ui four column centered grid">
                    <div className="column responsive">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label>Name</label>
                                <input type="text" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}></input>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="text" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} ></input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="text" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
                            </div>
                                {
                                    this.state.errors.map((error,index) => {
                                        return(
                                            <p className="error" key={index}>{error}</p>
                                        )
                                    })
                                }
                                <p id="register">Você já está registrado ? 
                                    <a href = 'javascript:void(0)' onClick={()=> this.setState({showLoginForm: true})}> Faça o login aqui</a>
                                </p>
                            <button className="ui positive button" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <LoginForm router = {this.props.router}/>
            )
        }
    }
}

