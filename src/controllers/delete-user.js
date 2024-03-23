import { ok, serverError } from './helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from './helpers/user.js'
import { DeleteUserUseCase } from '../use-cases/delete-user.js'

export class DeleteUserController {
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId
            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

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
