import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(PostgresGetUserByEmailRepository, createUserRepository) {
        this.createUserRepository = createUserRepository
        this.postgresGetUserByEmailRepository = PostgresGetUserByEmailRepository
    }
    async execute(createUserParams) {
        const emailExists = await this.postgresGetUserByEmailRepository.execute(
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
            ...createUserParams,
            password: hashedPassword,
        }

        //chamar o repositorio
        const createUser = await this.createUserRepository.execute(user)
        console.log(createUser)

        return createUser
    }
}
