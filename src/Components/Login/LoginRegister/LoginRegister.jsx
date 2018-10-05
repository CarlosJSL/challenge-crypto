import React, { Component } from 'react'
import {getAllDataOnDB,putValueOnDB} from '../../../connectDatabase';
import LoginForm from '../LoginForm/LoginForm'

export default class LoginRegister extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          name:"",
          email: "",
          password: "",
          showLoginForm:  false,
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

    async signUp(){
        try {
            const newUser = {
                ...this.state
            } 

            delete newUser['errors']
            delete newUser['showLoginForm']
            
            if (!this.validateForm().length) {
                const users = await getAllDataOnDB("user"); 

                if(users.find(user => user.email === newUser.email)){
                    this.setState({...this.state, errors: ['User already registered']});

                } else {
                    await putValueOnDB(newUser,"user")
                    this.props.router.history.push('/dashboard')
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
        this.signUp();
    }


    render() {
        if(!this.state.showLoginForm){
            return (
                <div className="ui two column centered grid">
                    <div className="four wide column">
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
                                            <p style={{color:"red"}} key={index}>{error}</p>
                                        )
                                    })
                                }
                                <p id="register">Are you registered ? 
                                    <a onClick={()=> this.setState({showLoginForm: true})}> Sign in here</a>
                                </p>
                            <button className="ui positive button" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            )
        } else{
            return (
                <LoginForm />
            )
        }
    }
}

