import { badRequest, ok, serverError } from '../helpers/http.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkPasswordIsStrong,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
} from '../helpers/user.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpResquest) {
        try {
            const userId = httpResquest.params.userId
            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const allowFields = ['first_name', 'last_name', 'email', 'password']

            const params = httpResquest.body

            const someFieldIsNotAllowed = Object.keys(params).some(
                (key) => !allowFields.includes(key),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsStrong = checkPasswordIsStrong(params.password)
                if (!passwordIsStrong) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)
                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
