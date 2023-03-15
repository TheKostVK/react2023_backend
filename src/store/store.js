import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {postReducer} from "./reducers/postsReducer";
import {usersReducer} from "./reducers/usersReducer";


const rootReducer = combineReducers({
    posts: postReducer,
    users: usersReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk))