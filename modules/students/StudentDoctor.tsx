import Link from "next/link";
import React from "react";

const StudentDoctor = ({
    matricNo,
    name,
    id,
    department
}: {
    matricNo: string;
    name: string;
    id: string;
    department: string
}) => {
    return (
        <Link href={`/doctors/dashboard/records/${id}`}>
            <div className="student shadowX p-[2rem] rounded-lg cursor-pointer hover:scale-105 trans">
                <h3 className="text-[1.3rem]">
                    <span className="font-bold">Matric No:</span> 
                    <span className="uppercase">{matricNo}</span>
                </h3>
                <h3 className="text-[1.3rem]">
                    <span className="font-bold">Name:</span> {name}
                </h3>
                <h3 className="text-[1.3rem]">
                    <span className="font-bold">Department:</span> {department}
                </h3>
            </div>
        </Link>
    );
};

export default StudentDoctor;
