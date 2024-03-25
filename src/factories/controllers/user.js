import { CreateUserController } from '../../controllers/create-user.js'
import { DeleteUserController } from '../../controllers/delete-user.js'
import { GetUserByIdController } from '../../controllers/get-user-by-id.js'
import { UpdateUserController } from '../../controllers/update-user.js'
import { PostgresCreateUserRepository } from '../../repositories/postgres/create-user.js'
import { PostgresDeleteUserRepository } from '../../repositories/postgres/delete-user.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/get-user-by-email.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/get-user-by-id.js'
import { PostgresUpdateUserRepository } from '../../repositories/postgres/update-user.js'
import { CreateUserUseCase } from '../../use-cases/create-user.js'
import { DeleteUserUseCase } from '../../use-cases/delete-user.js'
import { GetUserByIdUseCase } from '../../use-cases/get-user-by-id.js'
import { UpdateUserUseCase } from '../../use-cases/update-user.js'

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
