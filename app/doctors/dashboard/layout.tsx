import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import GlobalFont from "@/components/GlobalFont";
import DoctorHeader from "@/modules/doctor/DoctorHeader";
import { DoctorProtected } from "@/helpers/Protected";
import DoctorContextProvider from "@/context/DoctorContextProvider";

export const metadata: Metadata = {
    title: "FHCM | Doctor Dashboard",
    description: "FUTA Health Care Management Systems",
};

export default function DoctorsDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="mb-[3rem]">
                <div id="modal_portal" className="relative z-[99999]"></div>
                <GlobalFont>
                    <Toaster position="top-center" richColors />
                    <DoctorContextProvider>
                        <DoctorProtected>
                            <DoctorHeader />
                            {children}
                        </DoctorProtected>
                    </DoctorContextProvider>
                </GlobalFont>
            </body>
        </html>
    );
}
