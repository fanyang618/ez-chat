import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {Brief} from 'antd-mobile/lib/list/ListItem'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert

		alert('Log Out', 'Confirm Log Out?', [
		      { text: 'Cancel', onPress: () => console.log('cancel') },
		      { text: 'Confirm', onPress: () => {
		      	browserCookie.erase('userid')
		      	this.props.logoutSubmit()
		      }}
		    ])
    }

    render() {
        const props = this.props
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../avatar-selector/avatar/${props.avatar}.png`)} style={{width:60}} alt='' />}
                    title={props.user}
                    message={props.type==='mentor'?props.company:props.pos}
                />
                <List renderHeader='Personal Info'>
                    <List.Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=>(
                            <Brief key={v}>{v}</Brief>    
                        ))}          
                    </List.Item>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
				<Button onClick={this.logout}>Log Out</Button>
            </div>
        ):<Redirect to={this.props.redirectTo}/>
    }
}

export default User