const initialState = {
    loading: false,
    posts: [],
    error: null,
};

const userPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getUserPosts_onfetch':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'getUserPosts_success':
            return {
                ...state,
                loading: false,
                posts: action.posts,
                error: null,
            };
        case 'getUserPosts_failure':
            return {
                ...state,
                loading: false,
                error: action.errMsg,
            };
        default:
            return state;
    }
};

export default userPostsReducer;
