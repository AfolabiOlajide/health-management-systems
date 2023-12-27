'use client'
import { useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import DoctorContext from "./DoctorContext";
import { app } from "@/api/firebase";

const auth = getAuth(app)

const DoctorContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
        })
    }, []);

    return <DoctorContext.Provider value={{ 
        user,
    }}>{children}</DoctorContext.Provider>
}

export default DoctorContextProvider;