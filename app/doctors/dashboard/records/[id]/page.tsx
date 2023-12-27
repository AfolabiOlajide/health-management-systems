"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useContext } from "react";

import {
    DeleteRecordsDoctor,
    assignDoctor,
    clearStudentRecord,
    deleteStudentData,
    endStudentRecord,
    getAllDoctors,
    getSingleStudent,
    startStudentRecord,
    updateDoctorRecords,
    updateRecordAdmin,
} from "@/api/firebase";
import DoctorContext from "@/context/DoctorContext";

const Record = ({ params }: { params: { id: string } }) => {
    const { user } = useContext(DoctorContext);
    const router = useRouter();
    const [data, setData] = useState<singleStudentData>();
    const [doctors, setDoctors] = useState<DoctorType[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [doc, setDoc] = useState("");
    const [status, setStatus] = useState<"ongoing" | "not-started" | "ended">(
        "not-started"
    );
    
    // function to format class based on status
    const getStatusClass = (status: string | undefined) => {
        return status === "ongoing"
            ? "bg-orange-600"
            : status === "ended"
            ? "bg-red-600"
            : status === "not-started"
            ? "bg-green-600"
            : null;
    };


    // Use Effect fetches Students data and Doctors Data
    useEffect(() => {
        async function getStudentData() {
            const data = await getSingleStudent(params.id);
            // console.log(data);
            setData(data as singleStudentData);
            // if((data as singleStudentData).record.temprature.length > 0){
            //     setIsDisabled(true)
            //     setTemp((data as singleStudentData).record.temprature);
            //     setBlood((data as singleStudentData).record.bloodPressure);
            // }else{
            //     setIsDisabled(false)
            // }
            
            setDoc((data as singleStudentData).record.assignedDoctor);
            setStatus((data as singleStudentData).record.status as "ongoing" | "not-started" | "ended")
        }

        async function getDoctors() {
            const data = await getAllDoctors();
            setDoctors(data as DoctorType[]);
            // console.log("Doctors", data);
        }

        getStudentData();
        getDoctors();
    }, []);

    // function to get Doctors ID
    const getDoctorId = (doc: string) => {
        return doctors.filter(doctor => doctor.name === doc)[0].id;
    }

    // save doctors statement
    const save = () => {
        setIsDisabled(true)
    }

    // Update Record Visibility
    const updateRecord = () => {
        setIsDisabled(false);
    };


    // start Record
    const startRecord = async () => {
        try {
            await startStudentRecord(params.id);
            console.log("Updated Successfully");
            location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // end record
    const endRecord = async () => {
        try {
            await endStudentRecord(params.id);
            console.log("Ended Successfully");
            // remove record from doctor
            await DeleteRecordsDoctor(getDoctorId(user?.uid), params.id);
            // remove doctor from students data
            await assignDoctor(params.id, "");
            location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // Delete student record
    const deleteRecord = async () => {
        try {
            await clearStudentRecord(params.id);
            console.log("Cleared Successfully");
            router.push("/doctors/dashboard/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="cont my-[3rem]">
            {/* data */}
            <div className="data">
                <div className="name flex gap-3">
                    <h1 className="font-bold">Record ID: </h1>
                    <span>{params.id}</span>
                </div>
                <div className="name flex gap-3">
                    <h1 className="font-bold">Name: </h1>
                    <span>{data?.name}</span>
                </div>
                <div className="name flex gap-3">
                    <h1 className="font-bold">Matric No: </h1>
                    <span className="uppercase">{data?.matricNo}</span>
                </div>
                <div className="name flex gap-3">
                    <h1 className="font-bold">Level: </h1>
                    <span>{data?.level}</span>
                </div>
                <div className="name flex gap-3 items-center">
                    <h1 className="font-bold">Status: </h1>
                    <span
                        className={`${getStatusClass(
                            data?.record.status
                        )} p-[.3rem] text-white rounded-lg`}
                    >
                        {data?.record.status}
                    </span>
                </div>
            </div>


            {/* doctor record */}
            <div className="doctor-record my-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Doctor's Statement</h5>
                    <Textarea disabled={isDisabled} placeholder="Enter Statement" rows={7} className="border-gray"/>
                </div>
            </div>

            <div className="cta mb-[3rem]">
                {!isDisabled && <Button onClick={save}>Save</Button>}
                {isDisabled && <Button onClick={updateRecord}>Update</Button>}
            </div>

            {/* Drug Prescripton */}
            <div className="doctor-record mb-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Drug Prescription</h5>
                    <Textarea placeholder="Enter prescription" rows={7} className="border-gray"/>
                </div>
            </div>

            <div className="cta flex gap-[2rem]">
                {/* start record button */}
                { status === "not-started" && <Button
                    onClick={startRecord}
                    className="block mt-[3rem] bg-main hover:bg-main"
                >
                    Start Record
                </Button>}

                {/* end record button */}
                { status === "ongoing" && <Button
                    onClick={endRecord}
                    className="block mt-[3rem] bg-red-800 hover:bg-red-400"
                >
                    End Record
                </Button>}

                {/* end record button */}
                { status === "ended" && <Button
                    onClick={deleteRecord}
                    className="block mt-[3rem] bg-red-800 hover:bg-red-400"
                >
                    Delete Record
                </Button>}
            </div>
        </main>
    );
};

export default Record;
