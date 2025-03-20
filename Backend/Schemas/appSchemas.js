import z from "zod"

const clientSchema = z.object({
    nombre:z.string(),
})

const productSchema = z.object({
    nombre:z.string(),
    precio:z.number().positive(),
})

const discountSchema = z.object({
    value:z.number(),
})  

const orderSchema = z.object({
    precio:z.number().positive(),
})
export function validateClient(client){
    return clientSchema.safeParse(client)
}

export function validateProduct(product){
    return productSchema.safeParse(product)
}
export function validatePartialProduct(product){
    return productSchema.partial().safeParse(product)
}