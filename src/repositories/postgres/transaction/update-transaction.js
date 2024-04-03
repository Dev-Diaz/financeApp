import { PostgresHelper } from '../../../db/postgres/helper'

export class PostgresUpdateTransactionRepository {
    async execute(userId, updateTransactionParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateTransactionParams[key])
        })
        updateValues.push(userId)

        const updateQuery = `
        UPDATE users SET ${updateFields.join(', ')} 
        WHERE id = $${updateValues.length} 
        RETURNING *
        `
        const updateUser = await PostgresHelper.query(updateQuery, updateValues)

        return updateUser[0]
    }
}
