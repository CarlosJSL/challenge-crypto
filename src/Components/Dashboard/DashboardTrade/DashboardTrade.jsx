import React, { Component } from 'react';
import './DashboardTrade.css';

import DashboardCards from './DashboardCards';
import DashboardTransactions from './DashboardTransactions';


export default class DashBoardTrade extends Component {
    render () {
        return (
            <div className = "ui sixteen column grid">
                <div className = "row">
                    <div className = "sixteen wide column" >
                        <div className="ui segment">
                            <div className="ui two column very relaxed grid">
                                <div className=" column responsive-trade">
                                    <h2> Cryptos</h2>
                                    <DashboardCards getUserCryptoAmount = {this.props.user}/>
                                </div>
                                <div className="column responsive-trade">
                                    <h2 className = "responsive-show">Transações</h2>
                                    <DashboardTransactions transactions = {this.props.transactions}/>
                                </div>
                            </div>
                            <div className="ui vertical divider">
                                Wallet
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
