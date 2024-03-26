export class GetUserByIdUseCase {
    constructor(getUserByidRepository) {
        this.getUserByidRepository = getUserByidRepository
    }
    async execute(userId) {
        const user = await this.getUserByidRepository.execute(userId)

        return user
    }
}
