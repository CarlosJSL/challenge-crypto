import React, { Component } from 'react'
import './LoginForm.css'
import { getAllDataOnDB } from '../../../connectDatabase';
import LoginRegister from '../LoginRegister/LoginRegister'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email: "",
          password: "",
          showRegisterForm:  false,
          errors: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({...this.state,[event.target.id]: event.target.value});
    }

    validateForm() {
        const errors = [];
        if (this.state.email.length < 5) {
          errors.push("Email should be at least 5 charcters long");
        }
        if (this.state.email.split('').filter(x => x === '@').length !== 1) {
          errors.push("Email should contain a @");
        }
        if (this.state.email.indexOf('.') === -1) {
          errors.push("Email should contain at least one dot");
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
                    window.localStorage.setItem("user", JSON.stringify(user[0]))
                    this.props.router.history.push('/dashboard') 
                 } else { 
                    this.setState({...this.state, errors: ['User is not registered']});
                 } 

            } else {
                this.setState({...this.state, errors: this.validateForm()});
            }

        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.doLogin();
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
                                {
                                    this.state.errors.map((error,index) => {
                                        return(
                                            <p style={{color:"red"}} key={index}>{error}</p>
                                        )
                                    })
                                }
                                <p id="register">Are you not registered yet? 
                                    <a onClick={()=> this.setState({showRegisterForm: true})}> Sign up here</a>
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

