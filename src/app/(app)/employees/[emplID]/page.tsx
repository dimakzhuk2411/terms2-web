import { ViewEmployee } from "@/components/employees/employee-view"

export default async function EmployeeView({
    params
} : {
    params: Promise<{emplID: string}>
}) {
    const {emplID} = await params;


    return (
        <ViewEmployee emplID={emplID}/>
    )
}