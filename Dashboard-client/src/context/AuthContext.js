import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export function AuthContextProvider({ children }){
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {   
        // check if user in local storage
        const user = localStorage.getItem("user");

        // parse to json and dispatch to auth context
        if (user) {
            dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        }

    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}