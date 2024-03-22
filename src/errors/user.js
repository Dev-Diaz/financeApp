export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        return { message: `Email ${email} already in use.` }
    }
}
