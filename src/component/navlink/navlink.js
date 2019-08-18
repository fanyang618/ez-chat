import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const {pathname} = this.props.location
        const navList = this.props.data.filter(v=>!v.hide)
        return (
            <div style={{position:'fixed', width:'100%', bottom:0}}>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item key={v.path} title={v.text} 
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon = {{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        badge={v.path==='/msg'?this.props.unread:0}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}>
                        </TabBar.Item>    
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar