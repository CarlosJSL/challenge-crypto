import React from 'react'
import './DashboardTrade.css'

import DashboardCards from './DashboardCards'

export default () => (
<div className="ui segment">
    <div className="ui two column very relaxed grid">
        <div className="column">
            <h2> Trades</h2>
            <DashboardCards />
        </div>
        <div className="column">
            <h2> Transactions</h2>
        </div>
   </div>
   <div className="ui vertical divider">
      Wallet
   </div>
</div>
)