'use client'

import { Me } from "@/types/Session";
import { redirect } from "next/navigation";

async function getSession(): Promise<Me> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/session`,
        {
           credentials: "include" 
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

    if (session) redirect("/");

    return (
        <div className="min-h-0 h-full w-full">
            {children}
        </div>
    )
}