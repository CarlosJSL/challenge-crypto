import React from 'react';
import './DashboardTransactions.css';

export default (props) => (
    <table className="ui very basic collapsing celled table">
            <thead>
                <tr>
                    <th>Trocou</th>
                    <th>Por</th>
                </tr>
            </thead>
            <tbody>
                { 
                    props.transactions.map((transaction,index) => { 
                        return (
                            <tr key ={index}>
                            <td>
                                <h4 className="ui image header">
                                    <div className="content">
                                        {transaction.sell.totalValue} {transaction.sell.crypto}
                                        <div className="sub header">{transaction.date}</div>
                                    </div>
                                </h4>
                            </td>
                            <td>
                                <h4 className="ui image header">
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