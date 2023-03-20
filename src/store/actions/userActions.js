export function loginSuccess(user) {
    return { type: "LOGIN", payload: user };
}

export function logoutSuccess() {
    return { type: "LOGOUT" };
}

export function registerSuccess(user) {
    return { type: "REGISTER", payload: user };
}
