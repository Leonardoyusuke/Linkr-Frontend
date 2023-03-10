import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [infosUser, setInfosUser] = useState("");
    const [infoUsername, setInfoUsername] = useState("")

    return (
        <AuthContext.Provider value={{ infosUser, setInfosUser,infoUsername,setInfoUsername }}>
            {children}
        </AuthContext.Provider>
    );
}