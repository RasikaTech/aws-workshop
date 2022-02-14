import React, { useContext, createContext, useState } from "react";
import {AuthApiMock} from "./authMock";

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const signIn = (email, password) => {
        const user = AuthApiMock.signIn(email, password);
        setLoggedInUser(user);
    };

    const signOut = () => {
        setLoggedInUser(null);
    };

    return {
        loggedInUser,
        signIn,
        signOut
    };
}