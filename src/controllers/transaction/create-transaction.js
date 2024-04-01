import validator from 'validator'
import { badRequest, created, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/validations.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            //parametros recebidos pela requisicao
            const params = httpRequest.body
            //definicao dos campos obrigatorios
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']
            //loop para verificar se os campos obrigatorios existem na requisicao
            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    params[field].toString().trim().length === 0
                )
                    return badRequest({ message: `Missing Param: ${field}` })
            }
            //verificar se o id do usuario e valido
            const userIdIsValid = checkIfIdIsValid(params.user_id)
            //se nao for valido retornar erro padrao invalidIdResponse()
            if (!userIdIsValid) return invalidIdResponse()
            //se o campo amount for menor ou igual a zero retornar erro padrao badRequest()
            if (params.amount <= 0)
                return badRequest({ message: 'Amount must be greater than 0' })
            //chama o validator para verificar se o amount e valido, seguindo algumas
            //regras da biblioteca validator
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )
            //se o amount for invalido retornar erro padrao badRequest()
            if (!amountIsValid)
                return badRequest({
                    message: 'Amount must be a valid currency',
                })
            //tira os espacos do tipo e converte para maiuscula
            const type = params.type.trim().toUpperCase()
            //verifica se o tipo recebido pela requisicao
            //inclui ['EARNING', 'EXPENSE', 'INVESTMENT']
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )
            //se o tipo for invalido retornar erro padrao badRequest()
            if (!typeIsValid)
                return badRequest({
                    message: 'Type must be EARNING, EXPENSE or INVESTMENT',
                })
            //chama o use case para criar a transacao

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
