import React from 'react';
import './Login.css';
import stoneSvg from '../../images/stone.svg';
import LoginForm from './LoginForm/LoginForm';

export default (props) => (
    <div className="login-main">
        <div className="ui one column centered grid">
                <img className="logo" src={stoneSvg}></img>
        </div>
        <LoginForm router = {props} />
    </div>
)