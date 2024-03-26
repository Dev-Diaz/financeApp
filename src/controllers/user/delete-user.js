import { ok, serverError } from '../helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from '../helpers/user.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId
            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
