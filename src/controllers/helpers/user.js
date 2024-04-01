import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be 8 characters or more.',
    })
}

export const emailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid email format.',
    })
}

export const checkPasswordIsStrong = (password) => {
    return password.length > 8
}

export const checkIfEmailIsValid = (email) => {
    return validator.isEmail(email)
}

export const userNotFoundResponse = () => {
    return notFound({
        message: 'User not found!',
    })
}
