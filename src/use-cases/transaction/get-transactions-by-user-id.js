import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionByUserIdUseCase {
    constructor(
        PostgresGetTransactionsByUserIdRepository,
        GetUserByIdRepository,
    ) {
        this.postgresGetTransactionsByUserIdRepository =
            PostgresGetTransactionsByUserIdRepository

        this.getUserByIdRepository = GetUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.userId,
            )
        return transactions
    }
}
