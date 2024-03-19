import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
        this.passwordHasherAdapter = passwordHasherAdapter
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createUserParams) {
        // verificar se o e-mail já está em uso
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // gerar ID do usuário
        const userId = this.idGeneratorAdapter.execute()

        // criptografar a senha
        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password,
        )

        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório
        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
