import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => {
    return validator.isUUID(id)
}

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided ID is not valid.',
    })
}

export const checkIfIsString = (value) => typeof value === 'string'

export const validationRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: false,
            })
        if (fieldIsMissing || fieldIsEmpty)
            return {
                fieldMissing: field,
                ok: false,
            }
    }
    return {
        ok: true,
        fieldMissing: undefined,
    }
}
