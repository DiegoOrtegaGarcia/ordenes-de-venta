import api from "@/utils/axios"
import endpoint from "@/lib/constants/endpoint"
import { ProductInsertInterface } from "@/lib/types/types"

export const getProducts = async () => {
    const response = await api.get(`${endpoint}/productos`)
    return response.data
}

export const removeProductData = async (id: number) => {
    const response = await api.delete(`${endpoint}/productos/${id}`)
    return response.data
}

export const insertProductData = async (data: ProductInsertInterface) => {
    const response = await api.post(`${endpoint}/productos`, data)
    return response.data
}