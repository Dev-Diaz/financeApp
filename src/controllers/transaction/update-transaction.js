import { badRequest, ok, serverError } from '../helpers/http.js'
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from '../helpers/transaction.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validations.js'

export class UpdateTransactionController {
    constructor(UpdateTransactionUseCase) {
        this.updateTransactionUseCase = UpdateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const allowFields = ['name', 'date', 'amount', 'type']

            const params = httpRequest.body

            const someFieldIsNotAllowed = Object.keys(params).some(
                (key) => !allowFields.includes(key),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed.',
                })
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount)
                if (!amountIsValid) {
                    return invalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)
                if (!typeIsValid) {
                    return invalidTypeResponse()
                }
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                )
            return ok(updatedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
