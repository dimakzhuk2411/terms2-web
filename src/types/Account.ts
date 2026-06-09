export type Account = {
    user: {
        email: string,
        UAuth: {
            certID: string | null,
            certValid: Date | null
        }[],
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