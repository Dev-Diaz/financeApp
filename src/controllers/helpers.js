export const badRequest = (body) => {
    return {
        statuscode: 400,
        body,
    }
}

export const created = (body) => {
    return {
        statuscode: 201,
        body,
    }
}

export const serverError = () => {
    return {
        statuscode: 500,
        body: {
            message: 'Internal server error.',
        },
    }
}
