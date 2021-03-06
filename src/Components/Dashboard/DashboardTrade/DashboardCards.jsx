import React, { Component } from "react";
import './DashboardCards.css';
import { getBitcoinPrice , getBritaPrice } from '../../../utils/cryptoAPI';
import { getUserAmount, putValueOnDB, getUserInfo } from '../../../utils/connectDatabase';
import moment from 'moment';

export default class DashboardCards extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            cryptos: [],
            cryptoFocus:{},
            userCryptoAmounts: '',
            real_amount:0,
            crypto_amount:0,
            error:'',
            enableButton: 'ui teal labeled icon disabled button',
            quantity:0
        };

        this.changeAmount = this.changeAmount.bind(this) ;
        this.changeAmountSell = this.changeAmountSell.bind(this);
    }

    async componentDidMount(){
        this.setState({
                        ...this.state, 
                        cryptos: [ await getBitcoinPrice(), await getBritaPrice(Date())], 
                        userCryptoAmounts: await getUserAmount('user')
                     });
    }

    showModal(crypto, condition){
        this.setState({...this.state,cryptoFocus:crypto, crypto_amount:0, real_amount:0, quantity:0, error:''});

        if (condition === "buy") {
            window.$('.ui.modal.buy').modal('show');
        } else{
            window.$('.ui.modal.sell').modal('show');
        }
    }

    isNegative(cryptoQuantity) {
        return cryptoQuantity < 0;
    }
    
    changeAmount(event) {
        if (this.state.cryptoFocus.buy === 'Nao foi possivel obter o valor') {
            return this.setState({
                                    ...this.state, 
                                    real_amount: Number(totalPrice).toFixed(2), 
                                    error: 'Não foi possivel recuperar o valor da cryptomoeda. Por favor, ente novamente mais tarde', 
                                    enableButton:'ui teal labeled icon disabled button', 
                                    quantity:cryptoQuantity   
                                });
        }
        const cryptoQuantity = event.target.value;
        const totalPrice = cryptoQuantity * this.state.cryptoFocus.buy;

        if(!this.isNegative(cryptoQuantity)) {
            if (totalPrice > this.state.userCryptoAmounts.real_value ) {
                this.setState({
                                ...this.state, 
                                real_amount: Number(totalPrice).toFixed(2), 
                                error: 'Você não tem dinheiro suficiente para essa compra', 
                                enableButton:'ui teal labeled icon disabled button', 
                                quantity:cryptoQuantity   
                                });
            } else { 
                this.setState({
                                ...this.state, 
                                real_amount: Number(totalPrice).toFixed(2), 
                                error: '', 
                                enableButton:'ui teal labeled icon button', 
                                quantity: cryptoQuantity
                            });
            }
        } else {
            this.setState({
                            ...this.state, 
                            real_amount: Number(totalPrice).toFixed(2), 
                            error: 'Valores negativos não são permitidos', 
                            enableButton:'ui teal labeled icon disabled button', 
                            quantity:cryptoQuantity   
                        });
        }
    }

    changeAmountSell(event) {
        const cryptoQuantity = event.target.value;
        const totalPrice = cryptoQuantity * this.state.cryptoFocus.sell;
        
        if (this.state.cryptoFocus.sell === 'Nao foi possivel obter o valor') {
            return this.setState({
                                    ...this.state, 
                                    crypto_amount: Number(totalPrice).toFixed(2),
                                    error: 'Não foi possivel recuperar o valor da cryptomoeda. Por favor, ente novamente mais tarde', 
                                    enableButton:'ui teal labeled icon disabled button', 
                                    quantity:cryptoQuantity   
                                });
        }

        if(!this.isNegative(cryptoQuantity)) {
            if (cryptoQuantity > this.state.userCryptoAmounts[`${this.state.cryptoFocus.name}_value`] ) {
                this.setState({
                                ...this.state, 
                                crypto_amount: Number(totalPrice).toFixed(2), 
                                error: 'Você não tem dinheiro suficiente para essa venda', 
                                enableButton:'ui teal labeled icon disabled button', 
                                quantity:cryptoQuantity 
                            });
            } else { 
                this.setState({
                                ...this.state, 
                                crypto_amount: Number(totalPrice).toFixed(2), 
                                error: '', 
                                enableButton:'ui teal labeled icon button', 
                                quantity: cryptoQuantity
                            });
            }
        } else {
            this.setState({
                ...this.state, 
                real_amount: Number(totalPrice).toFixed(2), 
                error: 'Valores negativos não são permitidos', 
                enableButton:'ui teal labeled icon disabled button', 
                quantity:cryptoQuantity   
            });
        }
    }

    async makeTransaction(condition) {
        try {
            const user = await getUserInfo("user");
            let formatDecimals = 0;
            const transaction = {
                wallet: this.state.userCryptoAmounts,
                buy:{
                    crypto: this.state.cryptoFocus.name,
                    totalValue: this.state.quantity,
                },
                sell: {
                    crypto: "Reais",
                    totalValue: this.state.real_amount
                },
                date: moment(Date()).format('DD/MM/YYYY')
            };

            
            if (condition === "sell") {
                transaction.buy.crypto = "Reais";
                transaction.buy.totalValue = this.state.crypto_amount;
                transaction.sell.crypto = this.state.cryptoFocus.name;
                transaction.sell.totalValue = parseFloat(this.state.quantity);

                user.wallet.real_value = Number(Number(user.wallet.real_value) + Number(transaction.buy.totalValue)).toFixed(2) ;
                `${this.state.cryptoFocus.name}_value` === 'bitcoin_value'? formatDecimals = 8 : formatDecimals = 2;

                user.wallet[`${this.state.cryptoFocus.name}_value`] = 
                Number(Number(user.wallet[`${this.state.cryptoFocus.name}_value`]) -  Number(transaction.sell.totalValue)).toFixed(formatDecimals);

            } else {
                user.wallet.real_value = Number(Number(user.wallet.real_value) - Number(transaction.sell.totalValue)).toFixed(2);
                `${this.state.cryptoFocus.name}_value` === 'bitcoin_value'? formatDecimals = 8 : formatDecimals = 2;

                user.wallet[`${this.state.cryptoFocus.name}_value`] =   
                Number(Number(user.wallet[`${this.state.cryptoFocus.name}_value`]) + Number(transaction.buy.totalValue)).toFixed(formatDecimals);
            }
            
            await putValueOnDB(transaction, transaction.wallet.hash,"transactions");
            await putValueOnDB(user,user.email,"user");

            this.setState({
                            ...this.state, 
                            cryptos: [ await getBitcoinPrice(), await getBritaPrice(Date())], 
                            userCryptoAmounts: await getUserAmount('user')
                        });

            window.$('.ui.modal').modal('hide');
            this.props.getUserCryptoAmount();

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (       
            <div className="ui link cards">
                {
                    this.state.cryptos.map( (crypto,index) => {
                        return (
                        <div key = {index} className="ui centered card">
                            <div className="image">
                                <img alt ='crypto' src={crypto.logo}></img>
                            </div>
                            <div className="content">
                                <div className="header">{crypto.name}</div>
                                <div className="meta">
                                    <a href = '#!'>1 { crypto.name } -> R${crypto.buy}</a> 
                                </div>
                                <div className="description">
                                    <div className="ui center aligned segment">
                                        <button className="ui positive button" 
                                            onClick = { () => this.showModal(crypto, "buy")  }>Comprar
                                        </button>
                                        <button className=" negative ui button"
                                        onClick = { () => this.showModal(crypto, "sell")  }>Vender</button>
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
                <div  className="ui modal buy">
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
                                <h4>Total a ser gasto: R$ {this.state.real_amount} </h4>
                                <h5>{this.state.error} </h5>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui left action input">
                            <button className= {this.state.enableButton} onClick = { () => this.makeTransaction("buy")}>
                                <i className="cart icon"></i>
                                 Comprar
                            </button>
                            <input type="number"  
                                onChange = {this.changeAmount} 
                                value = {this.state.quantity}>
                            </input>
                        </div>
                    </div>
                </div>  
                <div  className="ui modal sell">
                    <div className="content">
                        <h2> Vender {this.state.cryptoFocus.name} </h2>
                        <div className="ui two column centered grid">
                            <div className = "column trade">
                                <h4>Saldo Atual ({this.state.cryptoFocus.name}) </h4>
                                <h4>({this.state.cryptoFocus.symbol}) {this.state.userCryptoAmounts[`${this.state.cryptoFocus.name}_value`]} </h4>
                            </div>
                            <div className = "column trade">
                                <h4>Valor (reais)</h4>
                                <h4>R$ {this.state.cryptoFocus.sell}</h4>
                            </div>
                        </div>
                        <div className="ui two column centered grid">
                            <div className = "column trade">
                                <h4>Total a ser recebido: R$ {this.state.crypto_amount} </h4>
                                <h5>{this.state.error} </h5>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui left action input">
                            <button className= {this.state.enableButton} onClick = { () => this.makeTransaction("sell")}>
                                <i className="cart icon"></i>
                                 Comprar
                            </button>
                            <input type="number"  
                                onChange = {this.changeAmountSell} 
                                value = {this.state.quantity}>
                            </input>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}