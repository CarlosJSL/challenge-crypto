import React, { Component } from 'react'
import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email: "",
          password: "",
          showRegisterForm:  false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange (event) {
        this.setState({[event.target.id]: event.target.value});
    }

    doLogin()   {
        const { email , password } = this.state;
        if(email === "carlos@gmail.com" && password === "123"){
            window.localStorage.setItem('user',JSON.stringify({username:'Carlos Jose'}));
            this.props.router.history.push('/dashboard')
        } 
    }

    handleSubmit(event){
        event.preventDefault();

        if(this.validateForm()){
            this.doLogin();
        }
    }

    render() {
        if(!this.state.showRegisterForm){
            return (
                <div className="ui two column centered grid">
                    <div className="four wide column">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label>Email</label>
                                <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="text" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
                            </div>
                             <p id="register">Are you not registered yet? 
                                <a onClick={()=> this.setState({showRegisterForm: true})}> Sign up here</a>
                            </p>
                            <button className="ui positive button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )
        } else  {
            return (
                <div className="ui two column centered grid">
                    <div className="four wide column">
                        <form className="ui form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label>Emaisl</label>
                                <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="text" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} ></input>
                            </div>
                             <p id="register">Are you registered ? 
                                <a onClick={()=> this.setState({showRegisterForm: false})}> Sign in here</a>
                            </p>
                            <button className="ui positive button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

