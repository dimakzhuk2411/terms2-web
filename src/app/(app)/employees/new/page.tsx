import { NewEmployeeComponent } from "@/components/employees/employee-new";
import { CheckAccess } from "@/lib/checkAccess";
import { Roles } from "@/lib/roles";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewEmployee() {

    const cookieStore = (await cookies()).toString();
    
    const allow = await CheckAccess(cookieStore, Roles.Employees);
    
    if (!allow) redirect("/");

    const allowEdit = await CheckAccess(cookieStore, Roles.EmployeesEdit);

    return(
        <NewEmployeeComponent canEdit={allowEdit}/>
    )
}