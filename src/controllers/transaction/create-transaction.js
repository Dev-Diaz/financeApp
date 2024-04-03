import { created, serverError } from '../helpers/http.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldsMissingResponse,
    validationRequiredFields,
} from '../helpers/validations.js'
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from '../helpers/transaction.js'

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
            const { ok: requiredFieldProvided, fieldMissing } =
                validationRequiredFields(params, requiredFields)

            if (requiredFieldProvided === false) {
                return requiredFieldsMissingResponse(fieldMissing)
            }

            //verificar se o id do usuario e valido
            const userIdIsValid = checkIfIdIsValid(params.user_id)
            //se nao for valido retornar erro padrao invalidIdResponse()
            if (!userIdIsValid) return invalidIdResponse()

            //chama o validator para verificar se o amount e valido, seguindo algumas
            //regras da biblioteca validator
            const amountIsValid = checkIfAmountIsValid(params.amount)
            console.log(params)
            //se o amount for invalido retornar erro padrao badRequest()
            if (!amountIsValid) return invalidAmountResponse()
            //tira os espacos do tipo e converte para maiuscula
            const type = params.type.trim().toUpperCase()
            //verifica se o tipo recebido pela requisicao
            //inclui ['EARNING', 'EXPENSE', 'INVESTMENT']
            const typeIsValid = checkIfTypeIsValid(type)
            //se o tipo for invalido retornar erro padrao badRequest()
            if (!typeIsValid) return invalidTypeResponse()
            //chama o use case para criar a transacao

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            console.log(transaction)

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
