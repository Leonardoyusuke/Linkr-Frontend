import { createContext, useState } from "react";

export const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {
    const [userImgUrl, setUserImgUrl] = useState([])

    return (
        <GlobalContext.Provider value={{ userImgUrl, setUserImgUrl }}>
            {children}
        </GlobalContext.Provider>
    )
}