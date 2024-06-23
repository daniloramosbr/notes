import { createContext, useState } from "react";

let myVar: any;

export const ContextJsx = createContext(myVar);  

type TitleProps = {
    children: any;
  }
  
  export const ContextProvider: any = ({ children }: TitleProps) => {

    const [data, setData] = useState({})
    
    return <ContextJsx.Provider value={{data, setData }}>{children}</ContextJsx.Provider>
}