import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        await PostgresHelper.query(
            'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.id,
                createUserParams.first_name,
                createUserParams.last_name,
                createUserParams.email,
                createUserParams.password,
            ],
        )
        const createdUser = await PostgresHelper.query(
            'SELECT * FROM users WHERE id =$1',
            [createUserParams.id],
        )
        console.log(`
        Usuário criado com sucesso!
        ID: ${createdUser[0].id}
        Nome: ${createdUser[0].first_name}
        Sobrenome: ${createdUser[0].last_name}
        Email: ${createdUser[0].email}
        Senha: ${createdUser[0].password}
        `)
    }
}
