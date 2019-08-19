import React from 'react'
import { NavBar} from 'antd-mobile';
import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Mentor from '../mentor/mentor'
import Mentee from '../mentee/mentee'
import User from '../personal/personal'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

function Msg() {
    return <h2>Message List</h2>
}

@connect(
    state=>state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        const user = this.props.user
        const navList = [
            {
                path:'/mentor',
                text:'Mentee',
                icon:'boss',
                title:'Mentee List',
                component:Mentor,
                hide:user.type==='mentee'
            },
            {
                path:'/mentee',
                text:'Mentor',
                icon:'job',
                title:'Mentor List',
                component:Mentee,
                hide:user.type==='mentor'
            },
            {
                path:'/msg',
                text:'Message',
                icon:'msg',
                title:'Message List',
                component:Msg,
            },
            {
                path:'/me',
                text:'profile',
                icon:'user',
                title:'Personal Info',
                component:User,
            }
        ]
        const {pathname} = this.props.location
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
        
    }
}

export default Dashboard