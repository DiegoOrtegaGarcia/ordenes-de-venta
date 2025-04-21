import { getProductsData, insertProduct, removeProduct } from "@/helpers/products/productsData"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from "@/lib/types/types"
import { ProductInsertInterface } from "@/lib/types/types"
import { setProductos } from "@/lib/schemas/schemas";



const useProducts = () => {
    const [products, setProducts] = useState<Product[]>()
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMesage, setErrorMesage] = useState("")
    const [successMesage, setSuccessMesage] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<ProductInsertInterface>({
        resolver: zodResolver(setProductos),
      });
    
    const resetMessage = () => {
        setTimeout(() => {
            setErrorMesage("")
            setSuccessMesage("")
        }, 3000)
    }

    const getProductsInfo = async () => {
        setLoading(true)
        const response = await getProductsData()
        if (response.type === "error") {
            console.log(response.response)
        }
        else {
            setProducts(response.response)
        }
        setLoading(false)
    }

    const removeProductData = async (id: number) => {
        setLoading(true)
        const response = await removeProduct(id)
        if (response.type === "error") {
            console.log(response.response)
        }
        else {
            getProductsInfo()
        }
        setLoading(false)
    }

    const setProductData = async (data: ProductInsertInterface) => {
        setLoading(true)
        const response = await insertProduct(data)
        if (response.type === "error") {
            setErrorMesage(response.response)
        }
        else {
            setSuccessMesage("Producto creado")
            getProductsInfo()
        }
        setLoading(false)
        resetMessage()
    }
    const onSubmit = async (data: ProductInsertInterface) => {
        await setProductData(data)
    }

    const ChangeFormValue= () => {
        setShowForm(prev => !prev)
        getProductsInfo()
    }
    useEffect(() => {
        getProductsInfo()
    }, [])

    return (
        {
            products,
            removeProductData,
            register,
            handleSubmit,
            errors,
            onSubmit,
            loading,
            errorMesage,
            successMesage,
            setShowForm,
            ChangeFormValue,
            showForm
        }
    )
}

export default useProducts