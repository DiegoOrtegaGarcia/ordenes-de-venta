import { deleteOrderLine, setOrderLineData } from "@/helpers/odrderLine/orderLineData"
import { setOrderLine } from "@/lib/schemas/schemas"
import {  OrderLineInsertInterface, ProductLine } from "@/lib/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"


const useOrdersLine = () => {
    const [loadingLine, setLoadingLine] = useState(false)
    const [orderLines, setOrderLines] = useState<ProductLine[]>()
    const [showForm, setShowForm] = useState(false)
    const [errorMesage, setErrorMesage] = useState("")
    const [successMesage, setSuccessMesage] = useState("")


    const resetMessage = () => {
        setTimeout(() => {
            setErrorMesage("")
            setSuccessMesage("")
        }, 3000)
    }
    const { register, handleSubmit, formState: { errors } } = useForm<OrderLineInsertInterface>({
        resolver: zodResolver(setOrderLine),
      });

    const creteOrderLine = async (data: OrderLineInsertInterface,id: number) => {
        setLoadingLine(true)
        const response = await setOrderLineData(data,id)
        if (response.type === "error") {
            setErrorMesage(response.response.response.data)
        }
        else {
            setSuccessMesage("Producto agregado")
            console.log(response.response.response.data)
            setOrderLines(response.response.response.data)
        }
        resetMessage()
        setLoadingLine(false)
    }
    const onSubmit = async (data: OrderLineInsertInterface,id: number) => {
        await creteOrderLine(data,id)
    }

    const DeleteOrderLine = async (id: number) => {
        setLoadingLine(true); // Primero activar loading
        try {
            await deleteOrderLine(id);
            setSuccessMesage("Se elimino Correctamente")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMesage("Error Al Eliminar");
        } finally {
            setLoadingLine(false); // Siempre desactivar al final
            resetMessage();
        }
    }
    const ChangeFormValue= () => {
        setShowForm(prev => !prev)
    }

    
    return {
        orderLines,
        loadingLine,
        register,
        handleSubmit,
        errors,
        showForm,
        onSubmit,
        ChangeFormValue,
        errorMesage,
        successMesage,
        DeleteOrderLine,
        setLoadingLine
    }
}

export default useOrdersLine
