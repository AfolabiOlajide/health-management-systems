import GlobalFont from "@/components/GlobalFont";
import "@/styles/globals.css"

export const metadata = {
    title: "FUTA MediRecords Doctors | SignIn",
    description: "FUTA Health Care Management Systems",
};

export default function SignInRoot({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`bg-dark text-white flex items-center justify-center h-screen`}
            >
                <main className="bg-white/5 p-[1rem] backdrop-filter backdrop-blur-[4rem] rounded-md w-[90%] md:w-[40%] lg:w-[20%]">
                    <GlobalFont>{children}</GlobalFont>
                </main>
            </body>
        </html>
    );
}
