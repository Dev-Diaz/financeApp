import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TODO: verificar se o email esta em uso
        const postgresGetUserByEmailRpository =
            new PostgresGetUserByEmailRepository()
        const emailExists = await postgresGetUserByEmailRpository.execute(
            createUserParams.email,
        )
        if (emailExists) {
            throw new Error('The proveide email alredy in use')
        }
        //gerar ID do usuario
        const userId = uuidv4()
        //criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        //inserir usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }
        //chamar o repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserRepository.execute(user)

        return createUser
    }
}
