'use client'
import React, { createContext, useState } from "react"

export const MainContext = createContext({} as any);


export const MainContextProvider = ({children}: {children: React.ReactNode}) => {
    const [mode, setMode] = useState<boolean>(false)

    return(
        <MainContext.Provider value={{mode, setMode}}>
            {children}
        </MainContext.Provider>
    )
}