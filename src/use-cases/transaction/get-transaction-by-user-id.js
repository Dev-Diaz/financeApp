import { userNotFoundResponse } from '../../controllers/helpers/user'

export class GetTransactionByUserId {
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
            return userNotFoundResponse()
        }

        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.userId,
            )
        return transactions
    }
}
