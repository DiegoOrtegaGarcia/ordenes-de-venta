import { OrderLine, OrderLineInsertInterface } from "@/lib/types/types"
import { deleteOrderLineData, setOrderLine } from "@/services/orderLine/orderLine"

export const setOrderLineData = async (data: OrderLineInsertInterface,id: number) => {

    const dataToSend : OrderLine = {
        orderId: id, 
        productId: data.productId,
        quantity: data.quantity
    }
    try {
        const response = await setOrderLine(dataToSend)
        return {type: "success", response: response}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const deleteOrderLine = async (id: number) => {
    try {
        const response = await deleteOrderLineData(id)
        return {type: "success", response: response}
    } catch (error) {
        return {type: "error", response: error}
    }
}