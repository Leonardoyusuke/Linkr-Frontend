import { createContext, useState } from "react";

export const PagesContext = createContext()

export default function PagesContextProvider({ children }) {
    const [carrinho, setCarrinho] = useState([])
    const [selected, setSelected] = useState("Dinheiro")
    const [selecting, setSelecting] = useState(false)
    const [valorTotal, setValorTotal] = useState(0)
    const [name, setName] = useState("")

    return (
        <PagesContext.Provider value={{ carrinho, setCarrinho, selected, setSelected, selecting, setSelecting, valorTotal, setValorTotal, name, setName }}>
            {children}
        </PagesContext.Provider>
    )
}