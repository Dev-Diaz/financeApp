import { CreateTransactionController } from '../../controllers/transaction/create-transaction.js'
import { GetTransactionByUserIdController } from '../../controllers/transaction/get-transactions-by-user-id.js'
import { UpdateTransactionController } from '../../controllers/transaction/update-transaction.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transaction/create-transaction.js'
import { PostgresGetTransactionsByUserIdRepository } from '../../repositories/postgres/transaction/get-transactions-by-user-id.js'
import { PostgresUpdateTransactionRepository } from '../../repositories/postgres/transaction/update-transaction.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/get-user-by-id.js'
import { CreateTransactionUseCase } from '../../use-cases/transaction/create-transaction.js'
import { GetTransactionByUserIdUseCase } from '../../use-cases/transaction/get-transactions-by-user-id.js'
import { UpdateTransactionUseCase } from '../../use-cases/transaction/update-transaction.js'

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

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}
