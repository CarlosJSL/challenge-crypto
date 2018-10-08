import React, { Component } from 'react'
import './DashBoardHeader.css'
import stoneSvg from '../../../images/stone.svg'

export default class DashboardHeader extends Component {

    logout() {
        window.localStorage.removeItem("user")
        window.location.reload()
    }

    render() {
        return (
            <div className = "ui fixed inverted menu">
                <div className = "ui container">
                    <a href="#" className="header item"> 
                        <img  src={stoneSvg}>
                        </img>
                    </a>
                    <a onClick = {() => this.logout()} href="#" className="item">
                        <i className="sign-out icon"></i>
                    </a>
                    <a href="#" className="item">
                        Bem vindo, {JSON.parse(window.localStorage.getItem('user')).name||''}!
                    </a>
                </div>
            </div>
        )
    }
}