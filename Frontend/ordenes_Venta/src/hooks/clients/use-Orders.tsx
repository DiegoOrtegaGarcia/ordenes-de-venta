
import { createOrder, deleteOrder, getOrdersClient, getOrdersData } from "@/helpers/orders/ordersData"
import { Order } from "@/lib/types/types"
import { useEffect, useState } from "react"

const useOrders = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>()
    const [ordersClient, setOrdersClient] = useState<Order[]>()
    const [successMesageOrder, setSuccessMesageOrder] = useState("")
    const [errorMesageOrder, setErrorMesageOrder] = useState("")

    const resetMessageOrder = () => {
        setTimeout(() => {
            setErrorMesageOrder("")
            setSuccessMesageOrder("")
        }, 3000)
    }

    const CreateOrder = async (clientId: number) => {
        const date = new Date().toISOString();
        const response = await createOrder(date,clientId)
        if (response.type === "error") {
            setErrorMesageOrder(response.response.response.data)
        }
        else {
            getOrdersClientInfo(clientId)
            setSuccessMesageOrder("Orden creada")
        }

    }

    const getOrdersInfo = async () => {
        setLoading(true)
        const response = await getOrdersData()
        if (response.type === "error") {
            console.log(response.response)
           
        }
        else {
            setOrders(response.response)
            
        }
        resetMessageOrder()
        setLoading(false)
    }
    useEffect(() => {
        getOrdersInfo()
    }, [])

    const getOrdersClientInfo = async (id: number) => {
        setLoading(true)
        const response = await getOrdersClient(id)
        if (response.type === "error") {
            setErrorMesageOrder(response.response.response.data)
        }
        else {
            setOrdersClient(response.response.orders)
        }
        setLoading(false)
        resetMessageOrder()
    }

    const DeleteOrder = async (id: number) => {
        setLoading(true)
        const response = await deleteOrder(id)
        if (response.type === "error") {

            //Todo el manejo de errores en axios 
           // @ts-expect-error-error
            setErrorMesageOrder(response.response.response.data)
        }
        else {
            setSuccessMesageOrder("Orden eliminada")
            getOrdersInfo()
        }
        setLoading(false)
        resetMessageOrder()
    }
    return {
        orders,
        getOrdersInfo,
        loading,
        getOrdersClientInfo,
        ordersClient,
        CreateOrder,
        DeleteOrder,
        errorMesageOrder,
        successMesageOrder
    }
}

export default useOrders