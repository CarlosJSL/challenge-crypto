import React from 'react'
import './DashboardContent.css'

export default () => (
    <div className="ui grid">
        <div className="sixteen wide column">
            <h1>Patrimônio Total</h1>
                <br></br>
                <div className="ui  one column centered grid">
                    <div className="ui statistics">
                        <div className="statistic">
                            <div className="value"> 
                                {parseFloat(JSON.parse(window.localStorage.getItem('user')).wallet.real_value).toFixed(2).toLocaleString('br')} 
                            </div>
                            <div className="label"> R$ </div>
                        </div>
                        <div className="statistic">
                            <div className="value"> 
                                {parseFloat(JSON.parse(window.localStorage.getItem('user')).wallet.bitcoin_value).toLocaleString('pt')}  
                            </div>
                            <div className="label"> ฿ </div>
                        </div>
                        <div className="statistic">
                            <div className="value"> 
                                {parseFloat(JSON.parse(window.localStorage.getItem('user')).wallet.brita_value).toLocaleString('en')} 
                            </div>
                            <div className="label"> $ </div>
                        </div>
                    </div>
               </div>
               <br></br>
        </div>
    </div>
)