export type Session = {
    id: string,
    closed: Date | null,
    user: {
        email: string,
        employee: {
            fullname: string,
            department: {
                clientName: string
            },
            position: {
                clientName: string
            }
        }
    }
} | null