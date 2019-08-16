/***
 * Login Page Container
 */
import React from 'react';
import Logo from '../../component/logo/logo.js';
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            user:'',
            pwd:'',
            repeat_pwd:'',
            type:'mentor'
        }
    }
    
    handleChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    handleLogin() {
        this.props.login(this.state)
    }

    register() {
       this.props.history.push('/signup');
    }

    render() {
        return (
            <div>
                
                {this.props.redirectTo && this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <h2>Login Page</h2>
                <WingBlank>
                {this.props.msg? <p className='error_msg'>{ this.props.msg }</p>:null}
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>User Name</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>Password</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>Login</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>Sign Up</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login