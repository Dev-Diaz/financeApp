import { badRequest, created, serverError } from '../helpers/http.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfEmailIsValid,
    checkPasswordIsStrong,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
} from '../helpers/user.js'
import { validationRequiredFields } from '../helpers/validations.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpResquest) {
        try {
            const params = httpResquest.body
            //validar a requisicao (campos obrigatorios, tamanho de senha e email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const { ok: requiredFieldProvided, fieldMissing } =
                validationRequiredFields(params, requiredFields)

            if (requiredFieldProvided === false) {
                return badRequest({
                    message: `The field ${fieldMissing} is required.`,
                })
            }

            const passwordIsStrong = checkPasswordIsStrong(params.password)
            if (!passwordIsStrong) return invalidPasswordResponse()

            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) return emailIsAlreadyInUseResponse()

            //chamar use case

            const createdUser = await this.createUserUseCase.execute(params)

            //retornar a respota (status code)

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.log(error)

            return serverError()
        }
    }
}
