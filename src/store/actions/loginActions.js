export const login = (login, password) => async (dispatch) => {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
            const user = await response.json();
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
            const error = await response.text();
            dispatch({ type: "LOGIN_FAILURE", payload: error });
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
};