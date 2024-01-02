import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className=" flex flex-col justify-center items-center gap-[2rem] bg-dark min-h-screen">
            <header className="font-bold text-[3rem] text-white text-center">
                FUTA Medi Records
            </header>
            <div className=" flex items-center gap-[2rem]">
                <Link href={`/admin/signin`}>
                    <Button className="bg-white hover:bg-white text-dark">
                        Login as Admin
                    </Button>
                </Link>
                <Link href={`/doctors/signin`}>
                    <Button className="bg-white hover:bg-white text-dark">
                        Login as Doctor
                    </Button>
                </Link>
            </div>
        </main>
    );
}
