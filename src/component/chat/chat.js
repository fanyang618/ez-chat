import React from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'

class Chat extends React.Component {
    componentDidMount() {
        const socket = io('ws://localhost:9093')
    }

    render() {
        return <h2>chat With User: {this.props.match.params.user}</h2>
    }
}

export default Chat