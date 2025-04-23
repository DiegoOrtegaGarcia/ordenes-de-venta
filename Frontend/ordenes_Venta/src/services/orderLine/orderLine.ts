import endpoint from "@/lib/constants/endpoint"
import { OrderLine } from "@/lib/types/types"
import api from "@/utils/axios"

export const setOrderLine = async (data: OrderLine) => {
    const response = await api.post(`${endpoint}/ProductsLine`, data)
    return response.data
}

export const deleteOrderLineData = async (id: number) => {
    const response = await api.delete(`${endpoint}/ProductsLine/${id}`)
    return response.data
}