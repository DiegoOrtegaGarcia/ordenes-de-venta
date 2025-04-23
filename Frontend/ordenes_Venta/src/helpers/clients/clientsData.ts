import { ClientInsertInterface } from "@/lib/types/types"
import { addClientData, getClients, removeClientData } from "@/services/clients/clients"
import formatLetter from "@/utils/format/formatLetter"

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

export const addClient = async (data: ClientInsertInterface) => {

    const dataToSend : ClientInsertInterface = {
        name: formatLetter(data.name),
        credit: data.credit
    }
    try {
        const client = await addClientData(dataToSend)
        return {type: "success", response: client}
    } catch (error) {
        return {type: "error", response: error}
    }
}

