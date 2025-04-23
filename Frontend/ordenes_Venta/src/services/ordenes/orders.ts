import endpoint from "@/lib/constants/endpoint"
import { OrderInsertInterface } from "@/lib/types/types"
import api from "@/utils/axios"

export const getOrders = async () => {
    const response = await api.get(`${endpoint}/Orders`)
    return response.data
}

export const getOrdersClientData = async (id: number) => {
    const response = await api.get(`${endpoint}/Client/${id}`)
    return response.data
}

export const createOrderData = async (data: OrderInsertInterface) => {

    const response = await api.post(`${endpoint}/Orders`, data)
    return response.data
}

export const deleteOrderData = async (id: number) => {
    const response = await api.delete(`${endpoint}/Orders/${id}`)
    return response.data
}