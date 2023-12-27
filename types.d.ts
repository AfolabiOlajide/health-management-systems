type studentType = {
    id: string;
    name: string;
    department: string;
    level: string;
    matricNo: string;
};

type singleStudentData = {
    department: string;
    level: string;
    matricNo: string;
    name: string;
    record: {
        status: string;
        temprature: string;
        bloodPressure: string;
        doctorStatement: string;
        drugPrescription: string;
        assignedDoctor: string;
    };
    uid: string;
};


type DoctorType = {
    id: string,
    name: string,
    email?: string,
    uid?: string,
    assignedRecords?: [strings]
}