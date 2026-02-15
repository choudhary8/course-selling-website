import { createContext, useState, type ReactNode } from "react"

interface UserContextType{
    userName:string,
    setUserName:React.Dispatch<React.SetStateAction<string>>;
}
export const UserContext=createContext<UserContextType|undefined>(undefined);

interface props{
    children:ReactNode
}
export const UserContextProvider=({children}:props)=>{
    const [userName,setUserName]=useState<string>('');
    return <UserContext.Provider value={{userName,setUserName}}>
        {children}
    </UserContext.Provider>
}