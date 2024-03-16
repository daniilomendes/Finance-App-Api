import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'First name is required.',
        })
        .trim()
        .min(4, {
            message: 'First name is required.',
        }),
    last_name: z
        .string({
            required_error: 'Last name is required.',
        })
        .trim()
        .min(4, {
            message: 'Last name is required.',
        }),
    email: z
        .string({
            required_error: 'E-mail is required.',
        })
        .email({
            message: 'Please provide a valid e-mail.',
        })
        .trim()
        .min(4, {
            message: 'Email is required.',
        }),
    password: z
        .string({
            required_error: 'Password is required.',
        })
        .trim()
        .min(6, {
            message: 'Password must have at least 6 characters.',
        }),
})

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Some provided field is not allowed.',
})
