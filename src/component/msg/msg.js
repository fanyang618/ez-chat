import React from 'react'
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile';

@connect(
    state=>state
)
class Msg extends React.Component {
    latestMsg(arr) {
        return arr[arr.length-1]
    }

    render() {
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup)
        const Item = List.Item
        const userid = this.props.user._id
        return (
            <div>
                {chatList.map(v=>{
                    const latest = this.latestMsg(v)
                    console.log(latest)
                    const targetId = v[0].from===userid?v[0].to:v[0].from
                    const unread_num = v.filter(v=>!v.read && v.to===userid).length
                    if (!targetId) {
                        return null
                    }
                    const name = this.props.chat.users[targetId].name
                    const avatar = this.props.chat.users[targetId].avatar
                    return(
                        <List key = {latest._id}>
                            <Item
                                extra={<Badge text={unread_num}></Badge>} 
                                thumb = {require(`../avatar-selector/avatar/${avatar}.png`)}
                            >
                                {name}
                                <Item.Brief>{this.props.chat.users[latest.from].name}: {latest.content}</Item.Brief>
                                
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}

export default Msg