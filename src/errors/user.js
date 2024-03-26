export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        return { message: `Email ${email} already in use.` }
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User ${userId} not found.`)
        this.name = 'UserNotFoundError'
    }
}
