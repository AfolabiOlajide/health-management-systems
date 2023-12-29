"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Student from "@/modules/students/Student";
import React from "react";
import { getAllStudents } from "@/api/firebase";
import Link from "next/link";
import Loading from "@/modules/modals/Loading";
import { DNA } from "react-loader-spinner";

const AdminDashboard = () => {
    const [students, setStudents] = useState<studentType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchStudents = async () => {
            const res = await getAllStudents();
            if (search.length === 0) {
                setIsLoading(false);
                setStudents(res as studentType[]);
                return;
            }
            // console.log(res as studentType[]);
            const filter = (res as studentType[]).filter((student) =>
                student.matricNo.toLowerCase().includes(search.toLowerCase())
            );
            setStudents(filter);
            setIsLoading(false);
        };

        fetchStudents();
    }, [search]);

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <main className="cont mt-[3rem]">
            <div className="flex gap-[1.5rem]">
                <Input
                    value={search}
                    className="border-gray"
                    placeholder="Search students matric number"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <Button className="bg-main hover:bg-main/70">Search</Button> */}
                <Button
                    className="bg-dark hover:bg-dark/70"
                    onClick={clearSearch}
                >
                    Clear Search
                </Button>
            </div>

            <h3 className="mb-[2rem] font-bold mt-[3rem] text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
                Student Records
            </h3>

            {/* student found */}
            {students.length === 0 && !isLoading && (
                <div className="not-found">
                    <p className="mt-[2rem] font-bold">No student found</p>
                    <Link href={`/admin/dashboard/add`}>
                        <Button className="bg-dark hover:bg-dark/70">
                            Add Student
                        </Button>
                    </Link>
                </div>
            )}
            {students.length > 0 && !isLoading && (
                <div className="students mt-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.3rem]">
                    {students.map((student) => {
                        return (
                            <Student
                                key={student.id}
                                matricNo={student.matricNo}
                                name={student.name}
                                id={student.id}
                                department={student.department}
                            />
                        );
                    })}
                </div>
            )}
            {/* <Loading isOpen={isLoading}/> */}
            <div className="flex items-center justify-center">
            <DNA
                visible={isLoading}
                height="350"
                width="350"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
            </div>
        </main>
    );
};

export default AdminDashboard;
