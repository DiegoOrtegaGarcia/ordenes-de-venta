import { getClients, removeClientData } from "@/services/clients/clients"

export const getClientsData = async () => {
    try {
        const clients = await getClients()
        return {type: "success", response: clients}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const removeClient = async (id: number) => {
    try {
        await removeClientData(id)
        return {type: "success", response: "Cliente eliminado"}
    } catch (error) {
        return {type: "error", response: error}
    }
}