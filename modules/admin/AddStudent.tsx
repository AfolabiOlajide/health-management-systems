"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

// local imports
import { addStudent } from "@/api/firebase";

interface CustomError {
    error: any;
}

const AddStudent = () => {
    const router = useRouter();
    const [level, setLevel] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [matric, setMatric] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, seterror] = useState("");

    const required = name.length > 5 && matric.length > 10 && department.length > 10 && level.length > 0;

    const handleAddStudent = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if(!required){
            toast.warning("Enter All required Fields")
            return
        }
        setDepartment("")
        setLevel("")
        setMatric("")
        setName("")
        const res = await addStudent(name, matric, department, level);
        if ((res as CustomError).error) {
            seterror("Error Adding Students");
            toast.error("Error Adding Student Try Again")
            console.log(res);

            setTimeout(() => {
                seterror("");
            }, 4000);
        } else {
            toast.success("Added Student Successfully")
            router.push('/admin/dashboard')
            console.log((res as CustomError).error);
        }
    };
    return (
        <div className="students mt-[3rem]">
            {/* error message */}
            {error.length > 0 && (
                <div className="error w-full md:w-[60%] p-[1rem] text-center bg-red-500 text-white rounded-md">
                    {error}
                </div>
            )}

            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Name:<span className="text-red-700">*</span></h5>
                <Input
                    placeholder="students name"
                    className="border-gray"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Department:<span className="text-red-700">*</span></h5>
                <Input
                    placeholder="students department"
                    className="border-gray"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Matric No:<span className="text-red-700">*</span></h5>
                <Input
                    placeholder="Matric number"
                    className="border-gray"
                    value={matric}
                    onChange={(e) => setMatric(e.target.value)}
                />
            </div>
            <div className="form-control w-full md:w-[60%] mb-[2rem]">
                <h5 className="font-semibold">Level:<span className="text-red-700">*</span></h5>
                <Input
                    placeholder="students level"
                    className="border-gray"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
            </div>
            <div className="cta mt-[2rem]">
                <Button
                    className="bg-main hover:bg-main"
                    onClick={(e) => handleAddStudent(e)}
                >
                    Add Student
                </Button>
            </div>
        </div>
    );
};

export default AddStudent;
