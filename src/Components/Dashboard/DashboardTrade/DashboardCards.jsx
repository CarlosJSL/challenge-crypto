import React, { Component } from "react";
import './DashboardCards.css'
import { getBitcoinPrice , getBritaPrice } from '../../../utils/cryptoAPI'
import { getUserAmount } from '../../../connectDatabase'
import DashboardContent from '../DashboardContent/DashboardContent'

export default class DashboardCards extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            cryptos: [],
            cryptoFocus:{},
            userCryptoAmounts: '',
            amount:0,
            error:''
        }
       
    }

    async componentDidMount(){
        this.setState({...this.state, cryptos: [ await getBitcoinPrice(), await getBritaPrice(Date())], userCryptoAmounts: await getUserAmount('user')})
    }

    showModal(crypto){
        this.setState({...this.state,cryptoFocus:crypto})
        window.$('.ui.modal').modal('show');
    }

    changeAmount(event){
        const cryptoQuantity = event.target.value;
        (cryptoQuantity * this.state.cryptoFocus.buy > this.state.userCryptoAmounts.real_value ) 
            ? this.setState({...this.state, amount: cryptoQuantity * this.state.cryptoFocus.buy, error: 'Você não tem dinheiro suficiente para essa compra' })
            : this.setState({...this.state, amount: cryptoQuantity * this.state.cryptoFocus.buy, error: '' });
        //this.props.getUserCryptoAmount();
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
                                        <button className="ui positive button" 
                                            onClick = { () => this.showModal(crypto)  }>Comprar
                                        </button>
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
                <div className="ui modal">
                    <div className="content">
                        <h2> Comprar {this.state.cryptoFocus.name} </h2>
                        <div className="ui two column centered grid">
                            <div className = "column trade">
                                <h4>Saldo Atual (R$) </h4>
                                <h4>R$ {this.state.userCryptoAmounts.real_value}</h4>
                            </div>
                            <div className = "column trade">
                                <h4>Preço {this.state.cryptoFocus.name} ({this.state.cryptoFocus.symbol})</h4>
                                <h4>R$ {this.state.cryptoFocus.buy}</h4>
                            </div>
                        </div>
                        <div className="ui two column centered grid">
                            <div className = "column trade">
                                <h4>Total a ser gasto: R$ {this.state.amount} </h4>
                                <h5>{this.state.error} </h5>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui left action input">
                            <button className="ui teal labeled icon button">
                                <i className="cart icon"></i>
                                 Comprar
                            </button>
                            <input type="number" onChange = {this.changeAmount.bind(this)}></input>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }

}