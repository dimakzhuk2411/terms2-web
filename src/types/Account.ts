export type Account = {
    user: {
        email: string,
        UAuth: {
            certID: string | null,
            certValidFrom: string | null,
            certValid: string | null
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