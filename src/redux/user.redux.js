import Axios from "axios";
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    userid:'',
    pwd:'',
    type:''
}

// reducer
export function user(state=initState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload),isAuth:true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload),isAuth:true, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        default:
            return state
    }
}

// set error message
function errorMsg(msg) {
    return { msg, type:ERROR_MSG };
};

// return success code and data
function registerSuccess(data) {
    return { type:REGISTER_SUCCESS, payload:data }
}

// return success code and data
function loginSuccess(data) {
    return { type:LOGIN_SUCCESS, payload:data }
}

// receive register data and dispatch success/failure events
export function register({user, pwd, repeat_pwd, type}) {
    if (!user) {
        return errorMsg('User Name is required');
    } else if (!pwd) {
        return errorMsg('Password is required');
    }
    if (pwd != repeat_pwd) {
        return errorMsg('Confirm password is different from the password')
    }
    return dispatch=> {
        Axios.post('user/register', {user, pwd, type}).then(res=>{
            if (res.status == 200 && res.data.code == 0) {
                dispatch(registerSuccess({user,pwd,type}));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

// receive login data and dispatch success/failure events
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('User Name / Password is required');
    }
    return dispatch=> {
        Axios.post('user/login', {user, pwd}).then(res=>{
            if (res.status == 200 && res.data.code == 0) {
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}