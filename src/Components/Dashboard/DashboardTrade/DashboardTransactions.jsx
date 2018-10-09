import React, { Component } from 'react';

import './DashboardTransactions.css';

export default class DashboardTransactions extends Component {

    constructor (props) {
        super(props)
        this.state = {
            transactions: []
        }
    }
    render (){
        
            return (
                <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Trocou</th>
                                <th>Por</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                this.props.transactions.map((transaction,index) => { 
                                    return (
                                        <tr key ={index}>
                                        <td>
                                          <h4 className="ui image header">
                                                {/* <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" className="ui mini rounded image"></img> */}
                                                <div className="content">
                                                    {transaction.sell.totalValue} {transaction.sell.crypto}
                                                    <div className="sub header">{transaction.date}</div>
                                                </div>
                                            </h4>
                                        </td>
                                        <td>
                                            <h4 className="ui image header">
                                                {/* <img src="http://drawinglondon.com/wp-content/uploads/2018/01/how-to-draw-a-dollar-sign-money-sign-drawing-how-to-draw-a-dollar-sign-in-3d-youtube.jpg" className="ui mini rounded image"></img> */}
                                                <div className="content">
                                                    {transaction.buy.totalValue} {transaction.buy.crypto}
                                                    <div className="sub header">{transaction.date}</div>
                                                </div>
                                            </h4>
                                        </td>
                                      </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
            )
    }
}