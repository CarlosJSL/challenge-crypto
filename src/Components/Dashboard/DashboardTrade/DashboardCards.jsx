import React, { Component } from "react";
import './DashboardCards.css'

import { getBitcoinPrice , getBritaPrice } from '../../../utils/cryptoAPI'

export default class DashboardCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cryptos: []
        }
    }
    
    async componentDidMount(){
        this.setState({...this.state, cryptos: [ await getBitcoinPrice(), await getBritaPrice(Date())]})
    }

    render() {
        return (            
            <div className="ui link cards">
                {
                    this.state.cryptos.map( (crypto,index) => {
                        return (
                        <div key = {index} className="ui centered card">
                            <div className="image">
                                <img src={crypto.logo}></img>
                            </div>
                            <div className="content">
                                <div className="header">Bitcoin</div>
                                <div className="meta">
                                    <a>1 { crypto.name } -> {crypto.buy}</a>
                                </div>
                                <div className="description">
                                    <div className="ui center aligned segment">
                                        <button className="ui positive button">Comprar</button>
                                        <button className=" negative ui button">Vender</button>
                                    </div>
                                </div>
                            </div>
                            <div className="extra content">
                                <span>
                                    <i className="calendar icon"></i>
                                    Ultima atualização: {crypto.date}
                                </span>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        )
    }

}