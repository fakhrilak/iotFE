const initialState = {
    username:'',
    email: '',
    message: '',
    loading: true,
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case "USERS_CREATE":
            return {
                ...state,
                username: payload.username,
                email: payload.email,
                message: payload.message,
                loading: false,              
            }
        case "CLEAR_MESSAGE":
            return {
                message: "",
                loading: true

            }
            default:
                return state;
    }
}