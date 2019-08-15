// ez chat logo display component
import React from 'react'
import logo_icon from '../../static/chat.jpg'
import './logo.css'

class Logo extends React.Component {
    render() {
        return (
        <div className='logo-container'>
            <img src={logo_icon} alt=""/>
        </div>
        )
    }
}

export default Logo