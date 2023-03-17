import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {postsReducer} from "./reducers/postsReducer";
import {usersReducer} from "./reducers/usersReducer";
import userPostsReducer from "./reducers/userPostsReducer";


const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    userPosts: userPostsReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk))
