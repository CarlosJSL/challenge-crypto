import React from 'react'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import DashboardContent from './DashboardContent/DashboardContent'
import DashboardTrade from './DashboardTrade/DashboardTrade'

export default () => (    
    <div>
        <DashboardHeader />
        <DashboardContent />
        <DashboardTrade />
    </div>
)