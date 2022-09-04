import * as InfoService from '../../services/info.services';
import { SET_PROJECT } from '../Types/project.type';


export function getUserInfo() {
    return async function (dispatch, getState) {
        try {
            const data = await InfoService.getUserInfo();
            // setLoading(false);
            dispatch(setProject(data.data));
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function setProject(newPersonalDetails) {
    return {
        type: SET_PROJECT,
        payload: newPersonalDetails
    }
}