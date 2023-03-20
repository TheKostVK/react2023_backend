import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {postsReducer} from "./reducers/postsReducer";
import {usersReducer} from "./reducers/usersReducer";
import userPostsReducer from "./reducers/userPostsReducer";
import authReducer from "./reducers/authReducer";


const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    userPosts: userPostsReducer,
    auth: authReducer,
})



export const store = createStore(rootReducer, applyMiddleware(thunk))
