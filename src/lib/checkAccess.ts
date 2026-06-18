export async function CheckAccess(sessionCookie: string, roleId: string) {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/nextconnect/roles`,
        {
            headers: {
                Cookie: sessionCookie,
            }
        }
    );

    if (!res.ok) return false

    const roles: string[] = await res.json();

    if (roles.includes(roleId)) return true
    else return false
}