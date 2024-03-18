import { UserNotFoundError } from '../../errors/user.js'
import {
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            // verificar se o userId foi passado como parâmetro
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            // verificar ser o userId é um ID válido
            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // chamar o use case
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute(userId)

            // retornar resposta http
            return ok(transactions)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse
            }
            return serverError()
        }
    }
}
