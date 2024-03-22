import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpResquest) {
        try {
            const updateUserParams = httpResquest.body
            const userId = httpResquest.params.userId
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid!',
                })
            }

            const allowFields = ['first_name', 'last_name', 'email', 'password']

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (key) => !allowFields.includes(key),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed.',
                })
            }

            if (updateUserParams.password) {
                const passwordIsStrong = updateUserParams.password.length > 8
                if (!passwordIsStrong) {
                    return badRequest({
                        message: 'Password must be 8 characters or more.',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)
                if (!emailIsValid) {
                    return badRequest({
                        message: 'Invalid email format.',
                    })
                }
            }
            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
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
