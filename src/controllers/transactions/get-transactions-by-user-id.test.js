import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js'

describe('Get Transactions By User Id', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                user_id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(getUserByIdUseCase)

        return { sut, getUserByIdUseCase }
    }

    it('should return 200 when finding transaction by user id successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        // assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when missing userId param', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            query: { userId: undefined },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when userId param is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            query: { userId: 'invalid_user_id' },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 500 when GetUserByIdUseCase throws generic error', async () => {
        // arrange
        const { sut, getUserByIdUseCase } = makeSut()
        jest.spyOn(getUserByIdUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const response = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        // assert
        expect(response.statusCode).toBe(500)
    })

    it('should call GetTransactionByUserIdUseCase with correct params', async () => {
        // arrange
        const { sut, getUserByIdUseCase } = makeSut()
        const executeSpy = jest.spyOn(getUserByIdUseCase, 'execute')

        const userId = faker.string.uuid()

        // act
        await sut.execute({
            query: { userId },
        })

        // assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
