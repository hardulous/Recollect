
import { combineReducers } from "redux";
import { postReducer , authReducer } from './postsReducers.js'

export default combineReducers({

    posts: postReducer,
    auth: authReducer,

})