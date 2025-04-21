import { z } from 'zod';

export const setProductos = z.object({
    name: z.string().min(1,"El nombre es Obligatorio"),
    price: z.number().positive().min(1)
})

