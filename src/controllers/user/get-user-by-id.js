import { ok, serverError } from '../helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from '../helpers/user.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(httpResquest) {
        try {
            const isIdValid = checkIfIdIsValid(httpResquest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(
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
