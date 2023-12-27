import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { addAdmin } from "@/api/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomError {
    error: any
}


const AddAdmin = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, seterror] = useState("");


    const handleAddAdmin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setEmail("")
        setPassword("")
        setName("")
        const res = await addAdmin(email, password, name);
        if((res as CustomError).error){
            seterror("Error Adding Admin")
            console.log(res);

            setTimeout(() => {
                seterror("")
            }, 4000);
        }else{
            router.push('/admin/dashboard')

            console.log("Added admin Successful")
            console.log((res as CustomError).error);
        }
    }


    return (
        <div className="student mt-[3rem]">
            { error.length > 0 && <div className="error w-full md:w-[60%] p-[1rem] text-center bg-red-500 text-white rounded-md">{error}</div> }
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Name:</h5>
                <Input value={name} placeholder="Admin's name" type="text" className="border-gray" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Email:</h5>
                <Input value={email} placeholder="Admin's email" type="email" className="border-gray" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Password:</h5>
                <Input
                    value={password}
                    type="password"
                    placeholder="password"
                    className="border-gray"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="cta mt-[2rem]">
                <Button className="bg-main hover:bg-main" onClick={(e) => handleAddAdmin(e)}>Add Admin</Button>
            </div>
        </div>
    );
};

export default AddAdmin;
