import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfEmailIsValid,
    checkPasswordIsStrong,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
} from './helpers/user.js'

export class CreateUserController {
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

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0)
                    return badRequest({ message: `Missing Param: ${field}` })
            }

            const passwordIsStrong = checkPasswordIsStrong(params.password)
            if (!passwordIsStrong) return invalidPasswordResponse()

            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) return emailIsAlreadyInUseResponse()

            //chamar use case
            const createdUserUseCase = new CreateUserUseCase()

            const createdUser = await createdUserUseCase.execute(params)

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
