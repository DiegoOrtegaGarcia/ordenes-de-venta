import { ProductInsertInterface } from "@/lib/types/types"
import { getProducts, insertProductData, removeProductData } from "@/services/products/products"

export const getProductsData = async () => {
    try {
        const products = await getProducts()
        return {type: "success", response: products}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const removeProduct = async (id: number) => {
    try {
        await removeProductData(id)
        return {type: "success", response: "Producto eliminado"}
    } catch (error) {
        return {type: "error", response: error}
    }
}

export const insertProduct = async (data: ProductInsertInterface) => {

    const dataToSend : ProductInsertInterface = {
        name: data.name,
        price: data.price
    }
    try {
        const response = await insertProductData(dataToSend)
        return {type: "success", response: response}
    } catch (error) {
        return {type: "error", response: error}
    }
}