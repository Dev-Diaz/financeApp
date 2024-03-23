import { notFound, ok, serverError } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'
import { DeleteUserUseCase } from '../use-cases/delete-user.js'

export class DeleteUserController {
    async execute(httpResquest) {
        try {
            const isIdValid = checkIfIdIsValid(httpResquest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(
                httpResquest.params.userId,
            )

            if (!deletedUser) {
                return notFound({
                    message: 'User not found!',
                })
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
