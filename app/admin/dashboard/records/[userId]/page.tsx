'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const Record = ({ params }: { params: { userId: string } }) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [position, setPosition] = useState("bottom")
    const [doc, setDoc] = useState("");
    const [status, setStatus] = useState<"ongoing" | "not-started" | "ended">("not-started");
    

    const statusClass = status === "ongoing" ? "bg-orange-600" : status === "ended" ? "bg-red-600" : status === "not-started" ? "bg-green-600" : null


    const save = () => {
        setIsDisabled(true);
    }

    const updateRecord = () => {
        setIsDisabled(false);
    }

    return (
        <main className="cont my-[3rem]">
            <div className="name flex gap-3">
                <h1 className="font-bold">Record ID: </h1>
                <span>{params.userId}</span>
            </div>
            <div className="name flex gap-3">
                <h1 className="font-bold">Name: </h1>
                <span>Oshuporu Jango</span>
            </div>
            <div className="name flex gap-3">
                <h1 className="font-bold">Matric No: </h1>
                <span className="uppercase">ifs/20/2343</span>
            </div>
            <div className="name flex gap-3">
                <h1 className="font-bold">Level: </h1>
                <span>300</span>
            </div>
            <div className="name flex gap-3 items-center">
                <h1 className="font-bold">Status: </h1>
                <span className={`${statusClass} p-[.3rem] text-white rounded-lg`}>{status}</span>
            </div>

            {/* records */}
            <div className="record-form my-[3rem] flex gap-[3rem]">
                <div className="form-contol">
                    <h5 className="font-semibold">Temprature</h5>
                    <Input type="number" placeholder="temp" disabled={isDisabled} className="border-gray"/>
                </div>
                <div className="form-contol">
                    <h5 className="font-semibold">Blood Pressure</h5>
                    <Input type="number" placeholder="temp" disabled={isDisabled} className="border-gray"/>
                </div>
            </div>

            <div className="cta mb-[3rem]">
                {!isDisabled && <Button onClick={save}>Save</Button>}
                {isDisabled && <Button onClick={updateRecord}>Update</Button>}
            </div>

            {/* assign docstor */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="p-[2rem]">Assign Record to Doctor</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Available Doctors</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="None" onClick={(e) => setDoc("")}>None</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Olushola Johnson" onClick={(e) => setDoc("Olushola Johnson")}>Olushola Johnson</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Fetomi Sarah" onClick={(e) => setDoc("Fetomi Sarah")}>Fetomi Sarah</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Olubumi Gbenga" onClick={(e) => setDoc("Olubumi Gbenga")}>Olubumi Gbenga</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="assigned-doc mt-[2rem] flex items-center gap-[1rem]">
                <h5 className="font-semibold">Assigned Doctor:</h5>
                <span>{doc.length === 0 ? "None" : doc}</span>
            </div>


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



            {<Button onClick={updateRecord} className="block mt-[3rem] bg-main hover:bg-main">Start Record</Button>}
        </main>
    )
}

export default Record