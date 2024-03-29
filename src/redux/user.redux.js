import axios from "axios";
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'

const initState = {
    redirectTo:'',
    msg:'',
    userid:'',
    type:'',
}

// reducer
export function user(state=initState, action) {
    switch(action.type) {
        case LOGOUT:
            return {...initState, redirectTo:'/login'}
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
                return {...state, ...action.payload}
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
function authSuccess(obj) {
    const{pwd, ...data} = obj
    return { type:AUTH_SUCCESS, payload:data }
}

// receive register data and dispatch success/failure events
export function register({user, pwd, repeat_pwd, type}) {
    if (!user) {
        return errorMsg('User Name is required');
    } else if (!pwd) {
        return errorMsg('Password is required');
    }
    if (pwd !== repeat_pwd) {
        return errorMsg('Confirm password is different from the password')
    }
    return dispatch=> {
        axios.post('user/register', {user, pwd, type}).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user,pwd,type}));
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
        axios.post('user/login', {user, pwd}).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function logoutSubmit() {
    return {type:LOGOUT}
}

// update user information
export function update(data) {
    return dispatch=> {
        axios.post('/user/update',data).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function loadData(user_data) {
    return {type:LOAD_DATA, payload:user_data}
}

