const initState = {
    loading: true,
    success: false,
    errMsg: '',
    users: [],
}

export const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getUsers_success':
            return { ...state, ...action }
        case 'getUsers_onfetch':
            return { ...state, users: [], loading: true, success: false}
        case 'getUsers_failure':
            return { ...state, loading: false, success: false, errMsg: action.errMsg }
        default:
            return { ...state }
    }
}
