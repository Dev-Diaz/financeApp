export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }

    async execute(transactionId, params) {
        const transactionUpdated =
            await this.updateTransactionRepository.execute(
                transactionId,
                params,
            )
        return transactionUpdated
    }
}
