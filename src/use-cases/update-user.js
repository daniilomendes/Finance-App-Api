import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // 1 - se o e-mail estiver sendo atualizado, verificar se ele já está em uso
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (userWithProvidedEmail) {
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
        const postgresCreateUserRepository =
            await PostgresCreateUserRepository()
        const updatedUser = await postgresCreateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
