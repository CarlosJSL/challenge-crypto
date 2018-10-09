import React, { Component } from 'react'
import './DashboardContent.css'
import { getUserAmount } from '../../../connectDatabase'

export default class DashboardContent extends Component{

    constructor(props){
        super(props)
        this.state ={
            userCryptoAmount:''
        }
    }

    async componentDidMount(){
        this.setState({...this.state, userCryptoAmount: await getUserAmount('user')})
    }

    render () {
        return (
            <div  className="ui grid">
                <div className="sixteen wide column">
                    <h1>Patrimônio Total</h1>
                        <br></br>
                        <div className="ui  one column centered grid">
                            <div className="ui statistics">
                                <div className="statistic">
                                    <div className="value"> 
                                        {this.props.userCryptoAmount.real_value || this.state.userCryptoAmount.real_value} 
                                    </div>
                                    <div className="label"> R$ </div>
                                </div>
                                <div className="statistic">
                                    <div className="value"> 
                                        {this.props.userCryptoAmount.bitcoin_value  || this.state.userCryptoAmount.bitcoin_value} 
                                    </div>
                                    <div className="label"> ฿ </div>
                                </div>
                                <div className="statistic">
                                    <div className="value"> 
                                        {this.props.userCryptoAmount.brita_value || this.state.userCryptoAmount.brita_value} 
                                    </div>
                                    <div className="label"> $ </div>
                                </div>
                            </div>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
} 