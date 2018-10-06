import React from 'react'
import './DashBoardHeader.css'
import stoneSvg from '../../../images/stone.svg'

export default () => (
    <div className = "ui fixed inverted menu">
        <div className = "ui container">
            <a href="#" className="header item"> 
                <img  src={stoneSvg}>
                </img>
            </a>
            <a href="#" className="item">
                <i className="sign-out icon"></i>
            </a>
            <a href="#" className="item">
                Bem vindo, {JSON.parse(window.localStorage.getItem('user')).name}!
            </a>
        </div>
    </div>
)