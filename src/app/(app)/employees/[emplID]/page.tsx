import { ViewEmployee } from "@/components/employees/employee-view"

export default async function EmployeeView({
    params
} : {
    params: {emplID: string}
}) {
    


    return (
        <ViewEmployee/>
    )
}