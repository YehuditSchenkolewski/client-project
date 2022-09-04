import { combineReducers } from 'redux';
import auth from './auth.reducer';
import project from './project.reducer';

const unitedReducer = combineReducers({
    auth,
    project
});

export default unitedReducer;