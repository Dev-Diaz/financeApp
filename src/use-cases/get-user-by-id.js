export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByidRepository = new getUserByidRepository()

        const user = await getUserByidRepository.execute(userId)

        return user
    }
}
