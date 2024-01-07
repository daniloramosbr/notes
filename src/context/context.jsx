import { createContext, useState } from "react";

export const ContextJsx = createContext()

export const ContextProvider = ({children}) => {

    const [data, setData] = useState({})

    return <ContextJsx.Provider value={{data, setData }}>{children}</ContextJsx.Provider>;

}