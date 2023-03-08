import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [infosUser, setInfosUser] = useState("");

    return (
        <AuthContext.Provider value={{ infosUser, setInfosUser }}>
            {children}
        </AuthContext.Provider>
    );
}