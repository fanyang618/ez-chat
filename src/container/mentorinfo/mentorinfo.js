import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=>state.user,
    {update}
)
class MentorInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            company:'',
            desc:''
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect!==path ? <Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode='dark'> Complete Mentor Profile</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
                    this.setState({
                        avatar: imgname
                    })
                }}>
                </AvatarSelector>
                <InputItem onChange={(v)=>this.handleChange('title',v)}>Title</InputItem>
                <InputItem labelNumber={10} onChange={(v)=>this.handleChange('company',v)}>Current Company</InputItem>
                <TextareaItem rows={3} autoHeight placeholder='Personal Description and tell us how you could help' onChange={(v)=>this.handleChange('desc',v)}>
                </TextareaItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type='primary' onClick={()=>{
                    this.props.update(this.state)
                }}>
                Complete
                </Button>
            </div>
        )
    }
}

export default MentorInfo