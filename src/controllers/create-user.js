import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

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

            const passwordIsStrong = params.password.length > 8
            if (!passwordIsStrong)
                return badRequest({
                    message: 'Password must be 8 characters or more.',
                })

            const emailIsValid = validator.isEmail(params.email)
            if (!emailIsValid)
                return badRequest({ message: 'Invalid email format.' })

            //chamar use case
            const createdUserUseCase = new CreateUserUseCase()

            const createdUser = await createdUserUseCase.execute(params)

            //retornar a respota (status code)
            return created(createdUser)
        } catch (error) {
            console.log(error)

            return serverError()
        }
    }
}
