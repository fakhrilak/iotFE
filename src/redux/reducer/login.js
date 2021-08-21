const initialState = {
    users:null,
    message: '',
    loading: true,
    isLogin: false,
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch (type) {
        case "LOGIN_USERS_SUCCESS":
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                message: payload.messages,
                users: payload.data,
                loading: false,
                isLogin:  true,
            }
            case "LOGIN_USERS_FAIL":
                return {
                    ...state,
                    message: payload.message,
                    loading: false,
                    isLogin: false,
                }
            case "LOAD_USER_SUCCESS":
                return{
                    ...state,
                    message : payload.message,
                    users : payload.data,
                    isLogin:true
                }
            case "USERS_CREATE_SUCCESS":
                localStorage.setItem("token", payload.token)
                return{
                    ...state,
                    message: payload.messages,
                    users: payload.data,
                    loading: false,
                    isLogin:  true
                }   
            case "LOGOUT":
                localStorage.removeItem('token')
                return{
                    ...state,
                    users:null,
                    isLogin:false,
                }
            default:
                return state;
    }
}