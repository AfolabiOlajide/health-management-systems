import type { Metadata } from "next";
import "@/styles/globals.css";
import GlobalFont from "@/components/GlobalFont";
import AdminHeader from "@/modules/AdminHeader";

export const metadata: Metadata = {
    title: "FHCM | Admin Dashboard",
    description: "FUTA Health Care Management Systems",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <GlobalFont>
                    <AdminHeader />
                    {children}
                </GlobalFont>
            </body>
        </html>
    );
}