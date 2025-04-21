import endpoint from "@/lib/constants/endpoint"
import api from "@/utils/axios"

export const getClients = async () => {
    const response = await api.get(`${endpoint}/Client`)
    return response.data
}

export const removeClientData = async (id: number) => {
    const response = await api.delete(`${endpoint}/Client/${id}`)
    return response.data
}