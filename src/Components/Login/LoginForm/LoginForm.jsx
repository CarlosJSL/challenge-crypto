import React, { Component } from 'react'
import './LoginForm.css';
import { getAllDataOnDB } from '../../../utils/connectDatabase';
import LoginRegister from '../LoginRegister/LoginRegister';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          password: '',
          showRegisterForm:  false,
          errors: []
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
    async doLogin()   {
        try {
            
            if(!this.validateForm().length){
                const { email , password } = this.state;
                const users = await getAllDataOnDB("user");  
                const user = users.filter(user => user.email === email && user.password === password);

                if (user.length) {
                    window.localStorage.setItem("user", JSON.stringify(user[0]));
                    console.log(this.props)
                    this.props.router.history.push('/dashboard') ;
                 } else { 
                    this.setState({...this.state, errors: ['Usuário ou senha inválidos']});
                 } 

            } else {
                this.setState({...this.state, errors: this.validateForm()});
            }

        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.doLogin();
    }

    render() {
        if(!this.state.showRegisterForm){
            return (
                <div className="ui four column centered grid">
                    <div className="column responsive">
                        <form className="ui form" onSubmit={this.handleSubmit}>
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
                                <p id="register">Você não está cadastrado ainda? 
                                    <a href = 'javascript:void(0)' onClick={()=> this.setState({showRegisterForm: true})}> Cadastre-se aqui!</a>
                                </p>
                            <button className="ui positive button" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            )
        } else  {
            return (
                <LoginRegister router = {this.props.router} />
            )
        }
    }
}

