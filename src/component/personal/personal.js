import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button} from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem';

@connect(
    state=>state.user
)
class User extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../avatar-selector/avatar/${this.props.avatar}.png`)} style={{width:60}} alt='' />}
                    title={this.props.user}
                    message={this.props.type=='mentor'?this.props.company:this.props.pos}
                />
                <List renderHeader='Personal Info'>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v=>(
                            <Brief key={v}>{v}</Brief>    
                        ))}          
                    </List.Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button>Log Out</Button>
                </List>
            </div>
        ):null
    }
}

export default User