"use client";
import { useContext, useState, useEffect } from "react";

// local imports
import DoctorContext from "@/context/DoctorContext";
import {
    getAllDoctors,
    getAllStudents,
    getSingleStudent,
} from "@/api/firebase";
import StudentDoctor from "@/modules/students/StudentDoctor";

const DoctorsDashboard = () => {
    const { user } = useContext(DoctorContext);
    const [doctors, setDoctors] = useState<DoctorType[]>();
    const [doctor, setDoctor] = useState<DoctorType>();
    const [allStudents, setAllStudents] = useState<studentType[]>();

    const [records, setRecords] = useState<studentType[]>();

    const filterDoctor = () => {
        return doctors?.filter((doctor) => doctor.uid === user?.uid)[0];
    };

    useEffect(() => {
        async function getDoctors() {
            const data = await getAllDoctors();
            setDoctors(data as DoctorType[]);
            // console.log("Doctors", data);
        }

        async function getStudentsData() {
            const data = await getAllStudents();
            setAllStudents(data as studentType[]);
        }

        getDoctors();
        getStudentsData();
        // setDoctor(filterDoctor());
        setRecords(
            allStudents?.filter((student) =>
                doctor?.assignedRecords?.includes(student.id)
            )
        );
    }, []);

    const filteredData = allStudents?.filter((student) =>
        doctors
            ?.filter((doctor) => doctor.uid === user?.uid)[0]
            ?.assignedRecords?.includes(student.id)
    );

    console.log(filteredData);

    // const getRecords = async () => {
    //     for (let i = 0; i < (doctor?.assignedRecords?.length as number); i++) {
    //         await getStudent(doctor?.assignedRecords[i] as string)
    //     }
    // };

    return (
        <div className="cont my-[3rem]">
            <header>
                <div className="name text-[1.2rem] flex items-center gap-4">
                    <h2 className="font-bold">Doctor Id:</h2>
                    <span>{filterDoctor()?.uid}</span>
                </div>
                <div className="name text-[1.2rem] flex items-center gap-4">
                    <h2 className="font-bold">Name:</h2>
                    <span>{filterDoctor()?.name}</span>
                </div>

                {/* Assigned Records */}
                <div className="assigned-records mt-[3rem]">
                    <h3 className="text-[1.2rem] font-bold">
                        Assigned Records
                    </h3>

                    <div className="records mt-[1rem]">
                        {(filterDoctor()?.assignedRecords?.length as number) ===
                            0 && <p>No Records to show</p>}

                        {
                            filteredData?.map(data => {
                                return (
                                    <StudentDoctor department={data.department} matricNo={data.matricNo} name={data.name} key={data.id} id={data.id} />
                                )
                            })
                        }
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DoctorsDashboard;
