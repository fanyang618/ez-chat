import React from 'react'
import {List, InputItem, Button, NavBar} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {getMsgList, sendMsg,recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text:'', msg:[]}
    }

    componentDidMount() {
        this.props.getMsgList()
        this.props.recvMsg()
    }

    handleSubmit () {
        //socket.emit('sendmsg',{text: this.state.text})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text:''})
    }

    render() {
        const user = this.props.match.params.user
        return (
            <div>
                <NavBar mode='dark'>{this.props.match.params.user}</NavBar>
                

                {this.props.chat.chatmsg.map(v=>{
                    return v.from===user?(
                            <p key={v._id}>From: {v.content}</p>
                        ):(
                            <p key={v._id}>Me: {v.content}</p>
                        )
                })}
                <div className="stick-footer">
                    <List>
                    <InputItem
                        placeholder='Type Message Here'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={<span onClick={()=>this.handleSubmit()}> Send </span>}
                    >
                    </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat