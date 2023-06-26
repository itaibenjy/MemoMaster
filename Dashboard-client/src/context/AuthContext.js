// Importing createContext, useReducer and useEffect from React
import { createContext, useReducer, useEffect } from "react";

// Creating a new context for authentication
export const AuthContext = createContext();

// Reducer function for authentication state management
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

// Provider component for the authentication context
export function AuthContextProvider({ children }){
    // Using the authReducer to manage the authentication state
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    // useEffect hook to check if user is already logged in
    useEffect(() => {   
        // check if user in local storage
        const user = localStorage.getItem("user");

        // parse to json and dispatch to auth context
        if (user) {
            dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        }

    }, []);

    // Returning the AuthContext.Provider with the authentication state and dispatch function as value
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}