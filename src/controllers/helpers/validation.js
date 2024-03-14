import validator from 'validator'
import { badRequest } from './http.js'

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provider id is not valid.',
    })

export const checkIfIdIsValid = (id) => validator.isUUID(id)
