import { SET_AUTH, SET_ERROR, LOG_OUT } from '../Types/auth.type';

const initialState = {
    personalDetails: {
        id: "",
        name: "",
        Team: "",
        joinedAt: "",
        avatar: "",
    },
    isLoggedIn: false,
    error: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                personalDetails: action.payload,
                isLoggedIn: true
            }
        case LOG_OUT:
            return { initialState }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
}