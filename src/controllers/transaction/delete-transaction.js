import { ok, serverError } from '../helpers/http.js'
import { transactionNotFoundResponse } from '../helpers/transaction.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validations.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const { transactionId } = httpRequest.params
            const idIsValid = checkIfIdIsValid(transactionId)
            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)
            if (!deletedTransaction) {
                return transactionNotFoundResponse()
            }
            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            serverError()
        }
    }
}
