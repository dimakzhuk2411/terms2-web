import { EmployeesComponent } from "@/components/employees/employees";
import { CheckAccess } from "@/lib/checkAccess";
import { Roles } from "@/lib/roles";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {

    const cookieStore = (await cookies()).toString();

    const allow = await CheckAccess(cookieStore, Roles.Employees);

    if (!allow) redirect("/");

    const allowEdit = await CheckAccess(cookieStore, Roles.EmployeesEdit);

    return (
        <div className="min-h-0 h-full">
            <EmployeesComponent canEdit={allowEdit}/>
        </div>
    )
}