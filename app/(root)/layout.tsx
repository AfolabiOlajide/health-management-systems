import type { Metadata } from "next";
import "@/styles/globals.css";
import GlobalFont from "@/components/GlobalFont";

export const metadata: Metadata = {
    title: "FUTA MediRecords",
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
                <GlobalFont>{children}</GlobalFont>
            </body>
        </html>
    );
}
