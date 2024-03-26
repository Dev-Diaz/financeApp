import { EmailAlreadyInUseError } from '../../errors/user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.updateUserRepository = updateUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const providedEmail = await this.getUserByEmailRepository.execute(
                updateUserParams.email,
            )
            if (providedEmail && providedEmail.id !== userId) {
                return new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = (updateUserParams.password =
                await bcrypt.hash(updateUserParams.password, 10))
            user.password = hashedPassword
        }

        const userUpdated = await this.updateUserRepository.execute(
            userId,
            updateUserParams,
        )
        return userUpdated
    }
}
