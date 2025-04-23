import endpoint from "@/lib/constants/endpoint"
import { ClientInsertInterface } from "@/lib/types/types"
import api from "@/utils/axios"

export const getClients = async () => {
    const response = await api.get(`${endpoint}/Client`)
    return response.data
}

export const removeClientData = async (id: number) => {
    const response = await api.delete(`${endpoint}/Client/${id}`)
    return response.data
}

export const addClientData = async (data: ClientInsertInterface) => {

    const response = await api.post(`${endpoint}/Client`, data)
    return response.data
}

export const getOrders = async () => {
    const response = await api.get(`${endpoint}/Orders`)
    return response.data
}