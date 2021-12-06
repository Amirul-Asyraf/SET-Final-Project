const initState = {
    authResponse:null
};

const AuthReducer = (state=initState, action) => {
    switch(action.type){
        case 'RESTART_AUTH_RESPONSE':
            return {
                ...state,
                authResponse:null
            }
        case 'LOADING':
            return {
                ...state,
                authResponse:'loading...'
            }
        case 'SHORT_PASSWORD':
            console.log(action);
            return {
                ...state,
                authResponse: 'Password is too short.'
            }
        case 'SIGNUP_SUCCESS':
            console.log(action);
            return {
                ...state,
                authResponse: 'Signup was successful.'
            }
        case 'SIGNUP_ERROR':
            console.log(action);
            return {
                ...state,
                authResponse: action.res.message
            }
        case 'CODE_ERROR':
            console.log(action);
            return {
                ...state,
                authResponse: 'There seems to be a problem. Please try again later.'
            }
        case 'LOGIN_SUCCESS':
            console.log(action);
            return {
                ...state,
                authResponse: 'Redirecting you to dashboard..'
            }
        case 'LOGIN_ERROR':
            console.log(action);
            return {
                ...state,
                authResponse:action.res.message
            }
        default:
            return state;
    }
}

export default AuthReducer;