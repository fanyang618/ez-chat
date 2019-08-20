/***
 * Signup Page Container
 */
import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import Form from '../../component/form-wrapper/form'

@connect(
    state=>state.user,
    {register}
)
@Form
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.props.handleChange('type', "mentor")
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    login(){
        this.props.history.push('/login');
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>Signup Page</h2>
                <List>
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>User Name</InputItem>
                    <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>Password</InputItem>
                    <InputItem type='password' labelNumber={10} onChange={v=>this.props.handleChange('repeat_pwd',v)}>Comfirm Password</InputItem>
                    <WhiteSpace/>
                    {this.props.msg? <p className='error_msg'>{ this.props.msg }</p>:null}
                    <WhiteSpace/>
                    <RadioItem onChange={v=>this.props.handleChange('type','mentor')} checked={this.props.state.type==='mentor'}>I want to help - Be a Mentor</RadioItem>
                    <RadioItem onChange={v=>this.props.handleChange('type','mentee')} checked={this.props.state.type==='mentee'}>I need help - Be a Mentee</RadioItem>
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