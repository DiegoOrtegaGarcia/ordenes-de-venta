import { z } from 'zod';

export const setProductos = z.object({
    name: z.string().min(1,"El nombre es Obligatorio"),
    price: z.number().positive().min(1)
})

export const setClient = z.object({
    name: z.string().min(1,"El nombre es Obligatorio"),
    credit: z.number().positive().min(1)
})

export const setOrderLine = z.object({
    productId: z.number().positive().min(1),
    quantity: z.number().positive().min(1)
})
