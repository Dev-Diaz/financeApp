import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByidRepository = new PostgresGetUserByIdRepository()

        const user = await getUserByidRepository.execute(userId)

        return user
    }
}
