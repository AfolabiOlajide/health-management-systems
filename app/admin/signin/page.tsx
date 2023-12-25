'use client'
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



const AdminSignIn = () => {
    const [ error, setError ] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSignIn = async ()=> {
        // const result = await signIn("credentials", {
        //     email: emailRef.current?.value,
        //     password: passwordRef.current?.value,
        //     redirect: true,
        //     callbackUrl: "/app"
        // })
    }

    return (
        <div className=" flex flex-col gap-[2rem]">
            {/* Error */}
            { error && 
                <div className="error bg-red-600 text-white p-[1rem] rounded-md">
                    <p>There was a problem signing you in, please try again with the right credentials.</p>
                </div>
            }
            <Input ref={emailRef} placeholder="Email" type="email" className="bg-transparent"/>
            <Input ref={passwordRef}  placeholder="Password" type="password" className="bg-transparent" />
            <Button className="hover:text-white p-[2rem] bg-gray text-black rounded-md" onClick={handleSignIn}>
                Sign in
            </Button>
        </div>
    )
}

export default AdminSignIn