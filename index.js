import 'dotenv/config.js'
import express from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js'

const app = express()

app.use(express.json())

//Recuperar usuário
app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()
    const { statuscode, body } = await getUserByIdController.execute(request)

    response.status(statuscode).send(body)
})

//Criar usuário
app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController()

    const { statuscode, body } = await createUserController.execute(request)
    response.status(statuscode).send(body)
})

//Atualizar usuário
app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statuscode, body } = await updateUserController.execute(request)
    response.status(statuscode).send(body)
})

//Deletar usuário
app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController()

    const { statuscode, body } = await deleteUserController.execute(request)

    response.status(statuscode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on PORT ${process.env.PORT}`),
)
