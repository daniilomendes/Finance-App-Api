import { userNotFoundResponse } from '../../controllers/helpers.js'

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        // validar se o usuário existe
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            return userNotFoundResponse()
        }

        // chamar o repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId)

        return transactions
    }
}
