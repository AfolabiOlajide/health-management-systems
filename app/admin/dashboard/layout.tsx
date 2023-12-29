import type { Metadata } from "next";
import { Toaster } from 'sonner'
import "@/styles/globals.css";
import GlobalFont from "@/components/GlobalFont";
import AdminHeader from "@/modules/AdminHeader";
import AuthContextProvider from "@/context/AuthContextProvider";
import { AdminProtected } from "@/helpers/Protected";

export const metadata: Metadata = {
    title: "FUTA MediaRecords | Admin Dashboard",
    description: "FUTA Health Care Management Systems",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="pb-[3rem]">
                <div id="modal_portal" className="relative z-[99999]"></div>
                <GlobalFont>
                    <Toaster position="top-center" richColors/>
                    <AuthContextProvider>
                        <AdminProtected>
                            <AdminHeader />
                            {children}
                        </AdminProtected>
                    </AuthContextProvider>
                </GlobalFont>
            </body>
        </html>
    );
}