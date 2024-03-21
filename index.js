import 'dotenv/config.js'
import express from 'express'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { CreateUserController } from './src/controllers/create-user.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statuscode, body } = await createUserController.execute(request)
    response.status(statuscode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()

    const { statuscode, body } = await getUserByIdController.execute(request)

    response.status(statuscode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on PORT ${process.env.PORT}`),
)
