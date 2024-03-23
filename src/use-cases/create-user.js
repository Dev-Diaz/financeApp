import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        //TODO: verificar se o email esta em uso
        const postgresGetUserByEmailRpository =
            new PostgresGetUserByEmailRepository()
        const emailExists = await postgresGetUserByEmailRpository.execute(
            createUserParams.email,
        )
        if (emailExists) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        //gerar ID do usuario
        const userId = uuidv4()
        //criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        //inserir usuario no banco de dados
        const user = {
            id: userId,
            password: hashedPassword,
            ...createUserParams,
        }
        //chamar o repositorio
        const createUser = await this.createUserRepository.execute(user)
        console.log(createUser)

        return createUser
    }
}
