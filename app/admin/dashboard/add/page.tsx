'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddAdmin from "@/modules/admin/AddAdmin"
import AddDoctors from "@/modules/admin/AddDoctors"
import AddStudent from "@/modules/admin/AddStudent"
import { useState } from "react"

const Add = () => {
    const [active, setActive] = useState<"student" | "doctor" | "admin">("student")


    const handleSetActive = (name: "student" | "doctor" | "admin") => {
        setActive(name)
    }

    return (
        <main className="cont my-[3rem]">
            <nav className="nav flex gap-[1.5rem] items-center">
                <div className={`students text-[.8rem] md:text-base ${active === "student" ? "bg-lightMain text-white" : "text-[#000]"} p-[.5rem] rounded-md cursor-pointer`} onClick={() => handleSetActive("student")}>Add Student</div>

                <div className={`students text-[.8rem] md:text-base ${active === "doctor" ? "bg-lightMain text-white" : "text-[#000]"} p-[.5rem] rounded-md cursor-pointer`} onClick={() => handleSetActive("doctor")}>Add Doctor</div>

                <div className={`students text-[.8rem] md:text-base ${active === "admin" ? "bg-lightMain text-white" : "text-[#000]"} p-[.5rem] rounded-md cursor-pointer`} onClick={() => handleSetActive("admin")}>Add Admin</div>
            </nav>

            {/* add student */}
            {active === "student" && <AddStudent />}

            {/* add Doctor */}
            {active === "doctor" && <AddDoctors />}

            {/* add Admin */}
            {active === "admin" && <AddAdmin />}

        </main>
    )
}

export default Add