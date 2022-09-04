import { SET_PROJECT } from '../Types/project.type';
import { keyBy } from 'lodash';
import { LOG_OUT } from '../Types/auth.type';

export default function projectReducer(state = {}, action) {
    switch (action.type) {
        case SET_PROJECT:
            return {
                ...state,
                projectDetails: keyBy(
                    action.payload,
                    (singleProject) => singleProject.id
                )
            }
        case LOG_OUT:
            return {}
        default:
            return state;
    }
}