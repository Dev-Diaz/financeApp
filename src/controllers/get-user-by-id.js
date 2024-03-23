import { ok, serverError } from './helpers/http.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpResquest) {
        try {
            const isIdValid = checkIfIdIsValid(httpResquest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpResquest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
