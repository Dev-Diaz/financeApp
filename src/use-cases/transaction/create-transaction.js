import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(createTransactionParams) {
        //validar se o usuario existe
        const userId = createTransactionParams.userId

        const userExists = await this.getUserByIdRepository.execute(userId)
        if (!userExists) {
            throw new UserNotFoundError(userId)
        }
        //criar transacao
        const transactionId = uuidv4()
        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        })

        return transaction
    }
}
