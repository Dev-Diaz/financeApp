import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount, {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: `Amount must be a valid currency`,
    })
}

export const invalidTypeResponse = () => {
    return badRequest({
        message: `Type must be EARNING, EXPENSE or INVESTMENT`,
    })
}
