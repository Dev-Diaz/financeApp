import { CreateTransactionController } from '../../controllers/transaction/create-transaction'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transaction/create-transaction.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/get-user-by-id.js'
import { CreateTransactionUseCase } from '../../use-cases/transaction/create-transaction.js'

export const makeTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByidRepository = new PostgresGetUserByIdRepository()
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByidRepository,
    )
    const createTransactionController = CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
