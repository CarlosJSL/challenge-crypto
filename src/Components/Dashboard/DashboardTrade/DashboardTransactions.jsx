import React, { Component } from 'react'

import { getUserTransactions } from '../../../connectDatabase'

export default class DashboardTransactions extends Component {

    constructor (props) {
        super(props)
        this.state = {
            transactions: []
        }
    }
    render (){
        
            return (
                <div>
                    { 
                        this.props.transactions.map((transaction,index) => { 
                            return (
                                <p key = {index} >
                                    {transaction.date}
                                </p>
                            )
                        })
                    }
                </div>
            )
    }
}