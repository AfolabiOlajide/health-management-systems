'use client'
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signin } from "@/api/firebase"

interface CustomError {
    error: any
}

const AdminSignIn = () => {
    const router = useRouter();
    const [ error, setError ] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async ()=> {
        const res = await signin(email, password);
        if((res as CustomError).error){
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 4000);
        }else{
            router.push('/admin/dashboard/')
        }
    }

    return (
        <div className=" flex flex-col gap-[2rem]">
            {/* Error */}
            { error && 
                <div className="error bg-red-600 text-white p-[1rem] rounded-md">
                    <p>There was a problem signing you in, please try again with the right credentials.</p>
                </div>
            }
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="bg-transparent"/>
            <Input onChange={(e) => setPassword(e.target.value)}  placeholder="Password" type="password" className="bg-transparent" />
            <Button className="hover:text-white p-[2rem] bg-gray text-black rounded-md" onClick={handleSignIn}>
                Sign in
            </Button>
        </div>
    )
}

export default AdminSignIn