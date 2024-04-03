import { UserNotFoundError } from '../../errors/user.js'
import { ok, serverError } from '../helpers/http.js'
import { userNotFoundResponse } from '../helpers/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldsMissingResponse,
} from '../helpers/validations.js'

export class GetTransactionByUserIdController {
    constructor(GetTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = GetTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            if (!userId) {
                return requiredFieldsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })
            return ok(transactions)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            return serverError()
        }
    }
}
