"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// local imports
import { adminNavItems } from "@/lib/exports";
import { Button } from "@/components/ui/button";
import { signout } from "@/api/firebase";

const AdminHeader = () => {
    const router = useRouter()
    const pathName = usePathname();

    const handleSignOut = async() => {
        try {
            await signout();
            router.push('/admin/signin/')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <nav className="bg-main py-[1rem]">
            <div className="navlinks cont flex justify-between items-center">
                <div className="flex gap-[1.5rem]">
                    {adminNavItems.map((item) => {
                        return (
                            <Link key={item.id} href={item.link}>
                                <div
                                    className={`text-white capitalize p-[1rem] ${
                                        pathName === item.link &&
                                        "border-b border-white"
                                    }`}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {/* logout */}
                <Button
                    className="bg-red-500 hover:bg-red-300 hover:text-black"
                    onClick={handleSignOut}
                >
                    Log Out
                </Button>
            </div>
        </nav>
    );
};

export default AdminHeader;
