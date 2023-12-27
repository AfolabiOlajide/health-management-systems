"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Student from "@/modules/students/Student";
import React from "react";
import { getAllStudents } from "@/api/firebase";
import Link from "next/link";

const AdminDashboard = () => {
    const [students, setStudents] = useState<studentType[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await getAllStudents();
            if (search.length === 0) {
                setStudents(res as studentType[]);
                return;
            }
            // console.log(res as studentType[]);
            const filter = (res as studentType[]).filter((student) =>
                student.matricNo.toLowerCase().includes(search.toLowerCase())
            );
            setStudents(filter);
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

            {/* student found */}
            {students.length === 0 && (
                <div className="not-found">
                    <p className="mt-[3rem] font-bold">No student found</p>
                    <Link href={`/admin/dashboard/add`}>
                        <Button
                            className="bg-dark hover:bg-dark/70"
                        >
                            Add Student
                        </Button>
                    </Link>
                </div>
            )}
            {students.length > 0 && (
                <div className="students mt-[4rem] grid grid-cols-3 gap-[1.3rem]">
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
        </main>
    );
};

export default AdminDashboard;
