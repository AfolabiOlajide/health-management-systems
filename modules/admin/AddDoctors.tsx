'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// local imports
import { addDoctor } from "@/api/firebase";
import { useRouter } from "next/navigation";


interface CustomError {
    error: any
}


const AddDoctors = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, seterror] = useState("");


    const handleAddDoctor = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setEmail("")
        setPassword("")
        setName("")
        const res = await addDoctor(email, password, name);
        if((res as CustomError).error){
            seterror("Error Adding Doctor")
            console.log(res);

            setTimeout(() => {
                seterror("")
            }, 4000);
        }else{
            router.push('/admin/dashboard')
            console.log("Added Doctor Successful")
            console.log((res as CustomError).error);
        }
    }

    return (
        <div className="student mt-[3rem]">
            {/* error message */}
            { error.length > 0 && <div className="error w-full md:w-[60%] p-[1rem] text-center bg-red-500 text-white rounded-md">{error}</div> }

            {/* Form */}
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Name:</h5>
                <Input placeholder="Doctor's email" type="email" className="border-gray" 
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Email:</h5>
                <Input placeholder="Doctor's email" type="email" className="border-gray" 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Password:</h5>
                <Input
                    type="password"
                    placeholder="password"
                    className="border-gray"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="cta mt-[2rem]">
                <Button className="bg-main hover:bg-main" onClick={(e) => handleAddDoctor(e)}>Add Doctor</Button>
            </div>
        </div>
    );
};

export default AddDoctors;
