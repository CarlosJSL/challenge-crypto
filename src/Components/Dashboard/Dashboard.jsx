import React, { Component } from 'react'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import DashboardContent from './DashboardContent/DashboardContent'
import DashboardTrade from './DashboardTrade/DashboardTrade'

import { getUserAmount, getUserTransactions } from '../../utils/connectDatabase';

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userCryptoAmount: '',
            userTransactions: []
        };
        this.getUserCryptoAmount = this.getUserCryptoAmount.bind(this);
    }

    async componentDidMount() {
        this.setState({...this.state, userTransactions: await getUserTransactions("transactions")});
        
    }
    async getUserCryptoAmount(){
        this.setState({userCryptoAmount: await getUserAmount('user'), userTransactions: await getUserTransactions("transactions")});
    }
    
    render() {
        return (
            <div>
                <DashboardHeader />
                <DashboardContent userCryptoAmount = {this.state.userCryptoAmount} />
                <DashboardTrade  user = {this.getUserCryptoAmount} transactions = {this.state.userTransactions}/>
            </div>
        )
    }
} 