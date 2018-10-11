import React from 'react';
import './Login.css';
import stoneSvg from '../../images/stone.svg';
import LoginForm from './LoginForm/LoginForm';

export default (props) => (
    <div className="login-main">
        <img alt = "stone" className="logo" src={stoneSvg}></img>
        <LoginForm router = {props} />
    </div>
)