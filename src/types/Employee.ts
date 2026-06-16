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