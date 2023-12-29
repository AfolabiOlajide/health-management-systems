"use client";
import { toast } from "sonner";
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
    updateDoctorStatement,
    updateRecordAdmin,
} from "@/api/firebase";
import DoctorContext from "@/context/DoctorContext";
import Loading from "@/modules/modals/Loading";

const Record = ({ params }: { params: { id: string } }) => {
    const { user } = useContext(DoctorContext);
    const router = useRouter();
    const [data, setData] = useState<singleStudentData>();
    const [doctors, setDoctors] = useState<DoctorType[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [doctorStatement, setDoctorStatement] = useState<string>("");
    const [temp, setTemp] = useState<string>("");
    const [blood, setBlood] = useState<string>("");
    const [doc, setDoc] = useState("");
    const [status, setStatus] = useState<"ongoing" | "not-started" | "ended">(
        "not-started"
    );
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [change, setChange] = useState<number>(0)

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
            if ((data as singleStudentData).record.doctorStatement.length > 0) {
                setIsDisabled(true);
                setDoctorStatement(
                    (data as singleStudentData).record.doctorStatement
                );
            } else {
                setIsDisabled(false);
            }

            setTemp((data as singleStudentData).record.temprature);
            setBlood((data as singleStudentData).record.bloodPressure);
            setDoc((data as singleStudentData).record.assignedDoctor);
            setStatus(
                (data as singleStudentData).record.status as
                    | "ongoing"
                    | "not-started"
                    | "ended"
            );
            setIsLoading(false)
        }

        async function getDoctors() {
            const data = await getAllDoctors();
            setDoctors(data as DoctorType[]);
            // console.log("Doctors", data);
        }

        getStudentData();
        getDoctors();
    }, [change]);

    // function to get Doctors ID
    const getDoctorId = () => {
        return doctors.filter((doctor) => doctor.uid === user?.uid)[0].id;
    };

    // save doctors statement
    const save = async () => {
        setIsDisabled(true);
        try {
            await updateDoctorStatement(params.id, doctorStatement);
            toast.success("Updated Successfully");
            console.log("Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error("There Was an error try again");
        }
    };

    // Update Record Visibility
    const updateRecord = () => {
        setIsDisabled(false);
    };

    // start Record
    const startRecord = async () => {
        try {
            await startStudentRecord(params.id);
            console.log("Updated Successfully");
            setChange(prev => prev + 1)
        } catch (error) {
            console.log(error);
        }
    };

    // end record
    const endRecord = async () => {
        try {
            // end student record change status
            await endStudentRecord(params.id);
            toast.success("Students Status Changed");
            // remove doctor from students data
            await assignDoctor(params.id, "");
            toast.success("Ended Successfully");
            setChange(prev => prev + 1)
        } catch (error) {
            console.log(error);
            toast.error("There Was an error try again");
        }
    };


    // Delete student record
    const deleteRecord = async () => {
        try {
            await clearStudentRecord(params.id);
            console.log("Deleted Successfully");
            // remove record from doctor
            await DeleteRecordsDoctor(getDoctorId(), params.id);
            toast.success("Cleared Successfully");
            router.push("/doctors/dashboard/");
        } catch (error) {
            console.log(error);
        }
    };

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

            {/* records */}
            <div className="record-form my-[3rem] flex gap-[3rem]">
                <div className="form-contol">
                    <h5 className="font-semibold">Temprature</h5>
                    <Input
                        value={temp}
                        type="number"
                        placeholder="temp"
                        disabled
                        className="border-gray"
                    />
                </div>
                <div className="form-contol">
                    <h5 className="font-semibold">Blood Pressure</h5>
                    <Input
                        value={blood}
                        type="number"
                        placeholder="temp"
                        disabled
                        className="border-gray"
                    />
                </div>
            </div>

            {/* doctor record */}
            <div className="doctor-record my-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Doctor's Statement</h5>
                    <Textarea
                        value={doctorStatement}
                        onChange={(e) => setDoctorStatement(e.target.value)}
                        disabled={isDisabled}
                        placeholder="Enter Statement"
                        rows={7}
                        className="border-gray"
                    />
                </div>
            </div>

            <div className="cta mb-[3rem]">
                {!isDisabled && <Button onClick={save}>Save</Button>}
                {isDisabled && <Button onClick={updateRecord}>Update</Button>}
            </div>

            {/* Drug Prescripton */}
            {/* <div className="doctor-record mb-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Drug Prescription</h5>
                    <Textarea
                        placeholder="Enter prescription"
                        rows={7}
                        className="border-gray"
                    />
                </div>
            </div> */}

            <div className="cta flex gap-[2rem]">
                {/* start record button */}
                {status === "not-started" && (
                    <Button
                        onClick={startRecord}
                        className="block mt-[3rem] bg-main hover:bg-main"
                    >
                        Start Record
                    </Button>
                )}

                {/* end record button */}
                {status === "ongoing" && (
                    <Button
                        onClick={endRecord}
                        className="block mt-[3rem] bg-red-800 hover:bg-red-400"
                    >
                        End Record
                    </Button>
                )}

                {/* end record button */}
                {status === "ended" && (
                    <Button
                        onClick={deleteRecord}
                        className="block mt-[3rem] bg-red-800 hover:bg-red-400"
                    >
                        Delete Record
                    </Button>
                )}
            </div>
            <Loading isOpen={isLoading}/>
        </main>
    );
};

export default Record;
