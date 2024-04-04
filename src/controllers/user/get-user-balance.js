import { UserNotFoundError } from '../../errors/user'
import { ok, serverError } from '../helpers/http.js'
import { userNotFoundResponse } from '../helpers/user'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validations.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })

            return ok(balance)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            console.error(error)
            serverError()
        }
    }
}
