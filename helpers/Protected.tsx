"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import DoctorContext from "@/context/DoctorContext";

export const AdminProtected = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(()=> {
        const wait = setTimeout(() => {
            if(!user){
                router.push('/admin/signin');
            }
        }, 2000)
        
        return () => {
            clearTimeout(wait);
        }
    }, [user])

    return <>{user && children}</>;
};


export const DoctorProtected = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(DoctorContext);
    const router = useRouter();

    useEffect(()=> {
        const wait = setTimeout(() => {
            if(!user){
                router.push('/doctors/signin');
            }
        }, 2000)
        
        return () => {
            clearTimeout(wait);
        }
    }, [user])

    return <>{user && children}</>;
};
