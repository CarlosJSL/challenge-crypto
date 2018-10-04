import React from 'react'
import './LoginHeader.css'

export default () => (
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li ><a className="active" href="#about">About</a></li>
    </ul>
)