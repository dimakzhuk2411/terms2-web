import LoginForm from "@/components/massive/loginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSession() {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/session`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (!res.ok) return null;

    return res.json();
}

export default async function LoginPage() {
    const session = await getSession();

    if (session) redirect("/");
    
    return (
        <div className="min-h-0 h-full w-full">
            <div className="w-full h-full flex justify-center items-center">
                <LoginForm />
            </div>
        </div>
    )
}