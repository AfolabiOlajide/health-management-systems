"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// local imports
import { doctorNavItems } from "@/lib/exports";
import { Button } from "@/components/ui/button";
import { signout } from "@/api/firebase";

interface CustomError {
    error: any
}

const DoctorHeader = () => {
    const router = useRouter()
    const pathName = usePathname();

    const handleSignOut = async () => {
        try {
            await signout();
            router.push('/doctors/signin/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="bg-main py-[1rem]">
            <div className="navlinks cont flex items-center justify-between">
                <div className="links flex gap-[1.5rem]">
                    {doctorNavItems.map((item) => {
                        return (
                            <Link key={item.id} href={item.link}>
                                <div
                                    className={`text-white capitalize p-[1rem] rounded-md ${
                                        pathName === item.link &&
                                        "bg-white text-slate-900"
                                    }`}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {/* logout */}
                <Button className="bg-red-500 hover:bg-red-300 hover:text-black" onClick={handleSignOut}>
                    Log Out
                </Button>
            </div>
        </nav>
    );
};

export default DoctorHeader;
