import Link from "next/link";
import React from "react";

const Student = ({ matricNo, name, id }: { matricNo: string, name: string, id: string }) => {
    return (
        <Link href={`/admin/dashboard/records/${id}`}>
            <div className="student shadowX p-[3rem] rounded-lg cursor-pointer hover:scale-105 trans">
                <h3 className="text-[1.3rem]"><span className="font-bold">Matric No:</span> {matricNo}</h3>
                <h3 className="text-[1.3rem]"><span className="font-bold">Name:</span> {name}</h3>
            </div>
        </Link>
    );
};

export default Student;
