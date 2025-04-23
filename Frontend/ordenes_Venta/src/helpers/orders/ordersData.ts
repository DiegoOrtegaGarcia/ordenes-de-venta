import { OrderInsertInterface } from "@/lib/types/types"
import { createOrderData, deleteOrderData, getOrders, getOrdersClientData } from "@/services/ordenes/orders"

export const getOrdersData = async () => {
    try {
        const orders = await getOrders()
        return {type: "success", response: orders}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const getOrdersClient = async (id: number) => {
    try {
        const orders = await getOrdersClientData(id)
        return {type: "success", response: orders}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const createOrder = async (date : string,clientId: number) => {
    const dataToSend : OrderInsertInterface = {
        date: date,
        clientId: clientId
    }

    try {
        const response = await createOrderData(dataToSend)
        return {type: "success", response: response}
    }
    catch (error) {
        return {type: "error", response: error}
    }
}

export const deleteOrder = async (id: number) => {
    try {
        await deleteOrderData(id)
        return {type: "success", response: "Orden eliminada"}
    } catch (error) {
        return {type: "error", response: error}
    }
}