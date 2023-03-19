const initialUserState = {
    currentUser: null,
    isLoggedIn: false
}

function userReducer(state = initialUserState, action) {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true
            }
        case "LOGOUT":
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false
            }
        case "REGISTER":
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true
            }
        default:
            return state;
    }
}
