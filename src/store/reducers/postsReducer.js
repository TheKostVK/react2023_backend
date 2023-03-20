const initState = {
    loading: true,
    success: false,
    errMsg: '',
    posts: [],
}

export const postsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getPosts_success':
            return { ...state, ...action }
        case 'getPosts_onfetch':
            return { ...state, posts: [], loading: true, success: false}
        case 'getPosts_failure':
            return { ...state, loading: false, success: false, errMsg: action.errMsg }
        default:
            return { ...state }
    }
}


export const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getPost_success':
            return { ...state, ...action }
        case 'getPost_onfetch':
            return { ...state, post: [], loading: true, success: false}
        case 'getPost_failure':
            return { ...state, loading: false, success: false, errMsg: action.errMsg }
        default:
            return { ...state }
    }
}
