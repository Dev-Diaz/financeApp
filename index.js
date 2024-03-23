import 'dotenv/config.js'
import express from 'express'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { CreateUserController } from './src/controllers/create-user.js'
import { UpdateUserController } from './src/controllers/update-user.js'
import { DeleteUserController } from './src/controllers/delete-user.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByidRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByidRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statuscode, body } = await getUserByIdController.execute(request)

    response.status(statuscode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserRepository = new PostgresGetUserByIdRepository()
    const createUserUseCase = new CreateUserUseCase(createUserRepository)
    const createUserController = new CreateUserController(createUserUseCase)

    const { statuscode, body } = await createUserController.execute(request)
    response.status(statuscode).send(body)
})

//Atualizar usuário
app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statuscode, body } = await updateUserController.execute(request)
    response.status(statuscode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresGetUserByIdRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statuscode, body } = await deleteUserController.execute(request)

    response.status(statuscode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on PORT ${process.env.PORT}`),
)
