import React, { Component } from 'react'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import DashboardContent from './DashboardContent/DashboardContent'
import DashboardTrade from './DashboardTrade/DashboardTrade'

//import { getUserAmount } from '../../connectDatabase'

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userCryptoAmount: ''
        }
        this.getUserCryptoAmount = this.getUserCryptoAmount.bind(this)
    }

    getUserCryptoAmount(){
        this.setState({userCryptoAmount: {real_value:10, bitcoin_value:14, brita_value:12}})
    }
    
    render() {
        return (
            <div>
                <DashboardHeader />
                <DashboardContent userCryptoAmount = {this.state.userCryptoAmount} />
                <DashboardTrade  user = {this.getUserCryptoAmount}/>
            </div>
        )
    }
} 