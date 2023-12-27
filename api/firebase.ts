import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    deleteDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Add Admin
export const addAdmin = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await addDoc(collection(db, "admins"), {
            uid: user.uid,
            name: name,
            email: user.email,
        });
        return user;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// Add Doctor
export const addDoctor = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await addDoc(collection(db, "doctors"), {
            uid: user.uid,
            name: name,
            email: user.email,
            assignedRecords: [],
        });
        return user;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// Add Student
export const addStudent = async (
    name: string,
    matricNo: string,
    department: string,
    level: string
) => {
    try {
        await addDoc(collection(db, "students"), {
            uid: uuidv4(),
            name: name,
            matricNo: matricNo,
            department: department,
            level: level,
            record: {
                status: "not-started",
                temprature: "",
                bloodPressure: "",
                doctorStatement: "",
                drugPrescription: "",
                assignedDoctor: "",
            },
        });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// Sign In
export const signin = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return user;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// Sign Out
export const signout = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return false;
    }
};

// get All students
export const getAllStudents = async () => {
    try {
        const data: studentType[] = [];
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data()?.name,
                department: doc.data()?.department,
                level: doc.data()?.level,
                matricNo: doc.data()?.matricNo,
            });
        });
        return data;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// get single students
export const getSingleStudent = async (id: string) => {
    try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            return [];
        }
    } catch (error: any) {
        return { error: error?.message };
    }
};

// delete students record
export const deleteStudentData = async (id: string) => {
    try {
        await deleteDoc(doc(db, "students", id));
    } catch (error: any) {
        return { error: error?.message };
    }
};

// get all Doctors
export const getAllDoctors = async () => {
    try {
        const data: DoctorType[] = [];
        const querySnapshot = await getDocs(collection(db, "doctors"));
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data()?.name,
                uid: doc.data()?.uid,
                assignedRecords: doc.data()?.assignedRecords
            });
        });
        return data;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// update record
export const updateRecordAdmin = async (id: string, temp: string, bp: string) => {
    try {
        const studentRef = doc(db, "students", id);
        await setDoc(studentRef, { 
            record: {
                temprature: temp,
                bloodPressure: bp,
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// clear student record
export const clearStudentRecord = async (id: string) => {
    try {
        const studentRef = doc(db, "students", id);
        await setDoc(studentRef, { 
            record: {
                status: "not-started",
                temprature: "",
                bloodPressure: "",
                doctorStatement: "",
                drugPrescription: "",
                assignedDoctor: "",
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
};


// assign Doctors to Student
export const assignDoctor = async (id: string, name: string) => {
    try {
        const studentRef = doc(db, "students", id);
        await setDoc(studentRef, { 
            record: {
                assignedDoctor: name
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
};

// update Doctor records
export const updateDoctorRecords = async(id: string, recordId: string) => {
    try {
        const doctorsRef = doc(db, "doctors", id);
        await setDoc(doctorsRef, { 
            assignedRecords: arrayUnion(recordId)
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
}

// delete record Doctor 
export const DeleteRecordsDoctor = async(id: string, recordId: string) => {
    try {
        const doctorsRef = doc(db, "doctors", id);
        await setDoc(doctorsRef, { 
            assignedRecords: arrayRemove(recordId)
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
}

// start student record
export const startStudentRecord = async(id: string) => {
    try {
        const Ref = doc(db, "students", id);
        await setDoc(Ref, { 
            record: {
                status: "ongoing"
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
}

// end student record
export const endStudentRecord = async(id: string) => {
    try {
        const Ref = doc(db, "students", id);
        await setDoc(Ref, { 
            record: {
                status: "ended"
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
}

// update Doctors Statement
export const updateDoctorStatement = async(id: string, statement: string) => {
    try {
        const Ref = doc(db, "students", id);
        await setDoc(Ref, { 
            record: {
                doctorStatement: statement,
            }
        }, { merge: true });
        return true;
    } catch (error: any) {
        return { error: error?.message };
    }
}