/***
 * Signup Page Container
 */
import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {register}
)
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            user:'',
            pwd:'',
            repeat_pwd:'',
            type:'mentor'
        }
    }

    handleRegister() {
        this.props.register(this.state);
    }

    login(){
        this.props.history.push('/login');
    }

    handleChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>Signup Page</h2>
                <List>
                    <InputItem onChange={v=>this.handleChange('user',v)}>User Name</InputItem>
                    <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>Password</InputItem>
                    <InputItem type='password' labelNumber={10} onChange={v=>this.handleChange('repeat_pwd',v)}>Comfirm Password</InputItem>
                    <WhiteSpace/>
                    
                    <WhiteSpace/>
                    <RadioItem onChange={v=>this.handleChange('type','mentor')} checked={this.state.type==='mentor'}>I want to help - Be a Mentor</RadioItem>
                    <RadioItem onChange={v=>this.handleChange('type','mentee')} checked={this.state.type==='mentee'}>I need help - Be a Mentee</RadioItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='primary' onClick={this.handleRegister}>Sign Up</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>Login</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Signup