'use client'
import { useState, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import AuthContext from "./AuthContext";
import { app } from "@/api/firebase";

const auth = getAuth(app)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
        })
    }, []);

    return <AuthContext.Provider value={{ 
        user,
    }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;