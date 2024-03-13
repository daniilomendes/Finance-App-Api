import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
    }
    async execute(userId, updateUserParams) {
        // 1 - se o e-mail estiver sendo atualizado, verificar se ele já está em uso
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(updateUserParams.email)

        if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
            throw new EmailAlreadyInUseError(updateUserParams.email)
        }

        const user = {
            ...updateUserParams,
        }

        // 2 - se a senha estiver sendo atualizada, criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // 3 - chamar o repository para atualizar o usuário
        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
