import { CreateUserController } from '../../controllers/user/create-user.js'
import { DeleteUserController } from '../../controllers/user/delete-user.js'
import { GetUserBalanceController } from '../../controllers/user/get-user-balance.js'
import { GetUserByIdController } from '../../controllers/user/get-user-by-id.js'
import { UpdateUserController } from '../../controllers/user/update-user.js'
import { PostgresCreateUserRepository } from '../../repositories/postgres/user/create-user.js'
import { PostgresDeleteUserRepository } from '../../repositories/postgres/user/delete-user.js'
import { PostgresGetUserBalanceRepository } from '../../repositories/postgres/user/get-user-balance.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/get-user-by-email.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/get-user-by-id.js'
import { PostgresUpdateUserRepository } from '../../repositories/postgres/user/update-user.js'
import { CreateUserUseCase } from '../../use-cases/user/create-user.js'
import { DeleteUserUseCase } from '../../use-cases/user/delete-user.js'
import { GetUserBalanceUseCase } from '../../use-cases/user/get-user-balance.js'
import { GetUserByIdUseCase } from '../../use-cases/user/get-user-by-id.js'
import { UpdateUserUseCase } from '../../use-cases/user/update-user.js'

export const makeGetUserByIdController = () => {
    const getUserByidRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByidRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserRepository = new PostgresUpdateUserRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    return deleteUserController
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    )
    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )
    return getUserBalanceController
}
