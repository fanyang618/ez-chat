/***
 * Component that check whether to redirect to login page or user page
 */
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
    
    /*
    Get UserInfo:
        1.Check login or not
        2.User Type
        3.Is User profile complete 
    */
    componentDidMount() {
        const publicRoute = ['/login', '/signup'];
        const pathname = this.props.location.pathname;
        if (publicRoute.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/user/info').then(res=>{
            if (res.status == 200) {
                if (res.data.code == 0) {

                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }

    render() {
        return null
    }
}

export default AuthRoute