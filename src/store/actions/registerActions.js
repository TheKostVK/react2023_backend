export const register = (name, login, password) => async (dispatch) => {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, login, password }),
        });

        if (response.ok) {
            const user = await response.json();
            dispatch({ type: "REGISTER_SUCCESS", payload: user });
        } else {
            const error = await response.text();
            dispatch({ type: "REGISTER_FAILURE", payload: error });
        }
    } catch (error) {
        dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }
};
