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

    it('should return 201 when creating transaction successfully (expense)', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute(httpRequest)

        // assert
        expect(response.statusCode).toBe(201)
    })

    it('should return 201 when creating transaction successfully (earning)', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                type: 'EARNING',
            },
        })

        // assert
        expect(response.statusCode).toBe(201)
    })

    it('should return 201 when creating transaction successfully (investment)', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                type: 'INVESTIMENT',
            },
        })

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

    it('should return 400 when missing name', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                name: undefined,
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when missing date', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                date: undefined,
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when missing type', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                type: undefined,
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when missing amount', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                amount: undefined,
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when date is invalid', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                date: 'invalid_date',
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when type is not EXPENSE, EARNING or INVESTMENT', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const response = await sut.execute({
            body: {
                ...httpRequest.body,
                type: 'invalid_type',
            },
        })

        // assert
        expect(response.statusCode).toBe(400)
    })
})
