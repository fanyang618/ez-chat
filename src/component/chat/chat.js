import React from 'react'
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util';

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
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    handleSubmit () {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text:''})
    }

    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        const emoji = '😀 😃 '

        if (!users[userid]) {
            return null
        }
        const chatId = getChatId(userid, this.props.user._id)
        //console.log(chatId)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatId)
        return (
            <div>
                <div id='chat-page'>
                    <NavBar mode='dark' 
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}>
                        {users[userid].name}
                    </NavBar>
                    {chatmsgs.map(v=>{
                        const avatar = require(`../avatar-selector/avatar/${users[v.from].avatar}.png`)
                        return v.from===userid?(
                                <List key={v._id}>
                                    <Item thumb={avatar}>{v.content}</Item>
                                </List>
                            ):(
                                <List key={v._id}>
                                    <Item extra={<img src={avatar}/>} className='chat-me'>{v.content}</Item>
                                </List>
                            )
                    })}
                </div>
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