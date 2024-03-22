import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const providedEmail =
                await postgresGetUserByEmailRepository.execute(
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

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const userUpdated = await postgresUpdateUserRepository.execute(
            userId,
            updateUserParams,
        )
        return userUpdated
    }
}
