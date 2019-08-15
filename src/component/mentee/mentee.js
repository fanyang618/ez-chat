import React from'react'
import axios from 'axios'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Mentee extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        this.props.getUserList('mentor')
    }

    render() {
        return (
            <UserCard userList={this.props.userList}></UserCard>
        )
    }
}

export default Mentee