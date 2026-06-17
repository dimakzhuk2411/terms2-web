import { Me } from "@/types/Session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getSession(): Promise<Me> {
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

    return await res.json();
}

export default async function UnprotectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    if (session) return redirect("/");

    else return (
        <div className="min-h-0 h-full w-full">
            {children}
        </div>
    )
}