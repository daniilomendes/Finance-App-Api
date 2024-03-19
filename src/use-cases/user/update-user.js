import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.updateUserRepository = updateUserRepository
        this.passwordHasherAdapter = passwordHasherAdapter
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
            const hashedPassword = await this.passwordHasherAdapter.execute(
                updateUserParams.password,
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
