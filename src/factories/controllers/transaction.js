import { CreateTransactionController } from '../../controllers/transaction/create-transaction.js'
import { GetTransactionByUserIdController } from '../../controllers/transaction/get-transactions-by-user-id.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transaction/create-transaction.js'
import { PostgresGetTransactionsByUserIdRepository } from '../../repositories/postgres/transaction/get-transactions-by-user-id.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/get-user-by-id.js'
import { CreateTransactionUseCase } from '../../use-cases/transaction/create-transaction.js'
import { GetTransactionByUserIdUseCase } from '../../use-cases/transaction/get-transactions-by-user-id.js'

export const makeTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByidRepository = new PostgresGetUserByIdRepository()
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByidRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionByUserIdController = () => {
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
        getTransactionByUserIdRepository,
        getUserByIdRepository,
    )

    const getTransactionsByUserIdController =
        new GetTransactionByUserIdController(getTransactionByUserIdUseCase)
    return getTransactionsByUserIdController
}
