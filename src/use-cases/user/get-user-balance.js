import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.postgresGetUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)
        if (!user) {
            throw new UserNotFoundError()
        }
        const balance = await this.postgresGetUserBalanceRepository.execute(
            params.userId,
        )
        return balance
    }
}
