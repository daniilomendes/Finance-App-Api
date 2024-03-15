export class DeleteTransactionUseCase {
    constructor(DeleteTransactionRepository) {
        this.DeleteTransactionRepository = DeleteTransactionRepository
    }

    async execute(transactionId) {
        const transaction =
            await this.DeleteTransactionRepository.execute(transactionId)

        return transaction
    }
}
