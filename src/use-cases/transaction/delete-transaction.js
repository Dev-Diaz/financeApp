export class PostgresDeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.postgresDeleteTransactionRepository = deleteTransactionRepository
    }
    async execute(transactionId) {
        const transaction =
            await this.postgresDeleteTransactionRepository.execute(
                transactionId,
            )
        return transaction
    }
}
