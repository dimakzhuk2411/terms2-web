export type Employee = {
    id: string,
    fullname: string,
    mobile: string | null,
    corporate: string | null,
    fired: boolean,
    department: {
        clientName: string,
        management: {
            clientName: string
        }
    },
    position: {
        clientName: string
    }
}

export type EmployeeFull = {
    fullname: string,
    persnum: string,
    mobile: string,
    corporate: string,
    department: {
        clientName: string,
        management: {
            clientName: string
        }
    },
    position: {
        clientName: string
    },
    fired: boolean
}