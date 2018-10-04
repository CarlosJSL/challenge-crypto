import React from 'react'
import './Login.css'
import LoginHeader from './LoginHeader/LoginHeader'
import LoginForm from './LoginForm/LoginForm'

export default (props) => (
    <div className="login-main">
        <LoginHeader />
        <LoginForm router = {props} />
    </div>
)