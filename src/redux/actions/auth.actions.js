import * as AuthService from '../../services/auth.services';
import { SET_AUTH, SET_ERROR, LOG_OUT } from '../Types/auth.type';


export function setEmailAndPass(email, password, navigate) {
    return async function (dispatch, getState) {
        try {
            const data = await AuthService.login(email, password);
            // setLoading(false);
            const personalDetails = {
                id: data.personalDetails.id,
                avatar: data.personalDetails.avatar,
                joinedAt: data.personalDetails.joinedAt,
                Team: data.personalDetails.Team,
                name: data.personalDetails.name
            }
            dispatch(setAuth(personalDetails))
            if (data.token) {
                localStorage.setItem("token", JSON.stringify(data.token));
            }
            navigate('/info');
        }
        catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(setError(resMessage));
            // setLoading(false);
        }
    }
}

export function setAuth(newPersonalDetails) {
    return {
        type: SET_AUTH,
        payload: newPersonalDetails
    }
}

export function setError(errorMessage) {
    return {
        type: SET_ERROR,
        payload: errorMessage
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}