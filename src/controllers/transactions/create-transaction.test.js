import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction.js'

describe('Create Transaction Controller', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction
        }
    }

    const makeSut = () => {
        const createTransactionUseCaseStub = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(
            createTransactionUseCaseStub,
        )

        return { sut, createTransactionUseCaseStub }
    }

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    it('should return 201 when creating transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(201)
    })

    it('should return 400 when missing user_id', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                user_id: undefined,
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })
})
