"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { toast } from "sonner";
import Loading from "@/modules/modals/Loading";

const Record = ({ params }: { params: { userId: string } }) => {
    const router = useRouter();
    const [data, setData] = useState<singleStudentData>();
    const [doctors, setDoctors] = useState<DoctorType[]>([]);
    const [temp, setTemp] = useState<string>("");
    const [blood, setBlood] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [position, setPosition] = useState("bottom");
    const [doc, setDoc] = useState("");
    const [assignedDoc, setAssignedDoc] = useState("");
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
            const data = await getSingleStudent(params.userId);
            // console.log(data);
            setData(data as singleStudentData);
            if ((data as singleStudentData).record.temprature.length > 0) {
                setIsDisabled(true);
                setTemp((data as singleStudentData).record.temprature);
                setBlood((data as singleStudentData).record.bloodPressure);
            } else {
                setIsDisabled(false);
            }

            setDoc((data as singleStudentData).record.assignedDoctor);
            setAssignedDoc((data as singleStudentData).record.assignedDoctor);
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
    const getDoctorId = (doc: string) => {
        return doctors.filter((doctor) => doctor.name === doc)[0].id;
    };

    // save temprature and blood pressure data
    const save = async () => {
        setIsDisabled(true);
        try {
            await updateRecordAdmin(params.userId, temp, blood);
            toast.success("Updated Successfully");
            console.log("Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    // Assign/Update Doctor to student
    const saveDoctor = async () => {
        try {
            if (assignedDoc === "") {
                await assignDoctor(params.userId, doc);
                await updateDoctorRecords(getDoctorId(doc), params.userId);
                toast.success("Assign Doctor Successfully");
                console.log("Saved Doctor Successfully");
            } else {
                await DeleteRecordsDoctor(
                    getDoctorId(assignedDoc),
                    params.userId
                );
                await assignDoctor(params.userId, doc);
                await updateDoctorRecords(getDoctorId(doc), params.userId);
                toast.success("Updated Doctor Successfully");
                console.log("Updated Doctor Successfully");
            }
            setChange(prev => prev + 1)
        } catch (error) {
            console.log(error);
            toast.error("An error ocurred try again.");
        }
    };

    // Update Record Visibility
    const updateRecord = () => {
        setIsDisabled(false);
    };

    // start Record
    const startRecord = async () => {
        try {
            await startStudentRecord(params.userId);
            console.log("Updated Successfully");
            setChange(prev => prev + 1)
        } catch (error) {
            console.log(error);
        }
    };

    // end record
    const endRecord = async () => {
        try {
            await endStudentRecord(params.userId);
            console.log("Ended Successfully");
            // remove record from doctor
            await DeleteRecordsDoctor(getDoctorId(assignedDoc), params.userId);
            await assignDoctor(params.userId, "");
            setChange(prev => prev + 1)
        } catch (error) {
            console.log(error);
        }
    };

    // Delete student record
    const deleteRecord = async () => {
        try {
            await clearStudentRecord(params.userId);
            console.log("Cleared Successfully");
            router.push("/admin/dashboard/");
        } catch (error) {
            console.log(error);
        }
    };

    // Delete Student
    const deleteStudent = async () => {
        try {
            await deleteStudentData(params.userId);
            router.push("/admin/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="cont my-[3rem]">
            {/* data */}
            <div className="data">
                <div className="name flex gap-3 text-[.8rem] md:text-base">
                    <h1 className="font-bold">Record ID: </h1>
                    <span>{params.userId}</span>
                </div>
                <div className="name flex gap-3 text-[.8rem] md:text-base">
                    <h1 className="font-bold">Name: </h1>
                    <span>{data?.name}</span>
                </div>
                <div className="name flex gap-3 text-[.8rem] md:text-base">
                    <h1 className="font-bold">Matric No: </h1>
                    <span className="uppercase">{data?.matricNo}</span>
                </div>
                <div className="name flex gap-3 text-[.8rem] md:text-base">
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
                        disabled={isDisabled}
                        className="border-gray"
                        onChange={(e) => setTemp(e.target.value)}
                    />
                </div>
                <div className="form-contol">
                    <h5 className="font-semibold">Blood Pressure</h5>
                    <Input
                        value={blood}
                        type="number"
                        placeholder="temp"
                        disabled={isDisabled}
                        className="border-gray"
                        onChange={(e) => setBlood(e.target.value)}
                    />
                </div>
            </div>

            <div className="cta mb-[3rem]">
                {!isDisabled && <Button onClick={save}>Save</Button>}
                {isDisabled && <Button onClick={updateRecord}>Update</Button>}
            </div>

            {/* assign docstor */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="p-[2rem]">
                        Assign Record to Doctor
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Available Doctors</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                    >
                        <DropdownMenuRadioItem
                            value="None"
                            onClick={(e) => setDoc("")}
                        >
                            None
                        </DropdownMenuRadioItem>
                        {doctors.map((doctor) => (
                            <DropdownMenuRadioItem
                                key={doctor.id}
                                value={doctor.name}
                                onClick={(e) => setDoc(doctor.name)}
                            >
                                {doctor.name}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="assigned-doc mt-[2rem] flex items-center gap-[1rem]">
                <h5 className="font-semibold">Assigned Doctor:</h5>
                <span>{doc.length === 0 ? "None" : doc}</span>
            </div>
            <Button onClick={saveDoctor} className="mt-[1rem]">
                Save Doctor
            </Button>

            {/* doctor record */}
            {/* <div className="doctor-record mb-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Doctor's Statement</h5>
                    <Textarea disabled placeholder="Enter Statement" rows={7} className="border-gray"/>
                </div>
            </div> */}

            {/* Drug Prescripton */}
            {/* <div className="doctor-record mb-[3rem]">
                <div className="form-control">
                    <h5 className="font-semibold">Drug Prescription</h5>
                    <Textarea disabled placeholder="Enter prescription" rows={7} className="border-gray"/>
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

                <Button
                    onClick={deleteStudent}
                    className="block mt-[3rem] bg-red-800 hover:bg-red-400"
                >
                    Delete Student
                </Button>
            </div>
            <Loading isOpen={isLoading}/>
        </main>
    );
};

export default Record;
