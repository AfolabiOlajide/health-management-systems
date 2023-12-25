'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"

// local imports
import { adminNavItems } from "@/lib/exports"


const AdminHeader = () => {
    const pathName = usePathname();

    return (
        <nav className="bg-main py-[1rem]">
            <div className="navlinks cont flex gap-[1.5rem]">
                {adminNavItems.map(item => {
                    return (
                        <Link key={item.id} href={item.link}>
                            <div className={`text-white capitalize p-[1rem] rounded-md trans ${pathName === item.link && "bg-white text-[#285430]"}`}>{item.name}</div>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default AdminHeader