import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            return await prisma.user.delete({
                id: userId,
            })
        } catch (error) {
            return null
        }
    }
}
