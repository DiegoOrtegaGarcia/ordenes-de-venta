import useProducts from "@/hooks/products/use-Products"
import ProductoModel from "../layouts/productoModel"
import Loader from "../layouts/Loader"
import ProductsForm from "../layouts/forms/productsForm"
import { PlusCircle, Trash2 } from "lucide-react"

const Products = () => {
    const { products, removeProductData, loading, showForm, ChangeFormValue } = useProducts()

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
                <p className="text-gray-600">Administra los  productos</p>
            </div>

            {/* Form Modal and Loader */}
            {showForm && <ProductsForm onClose={ChangeFormValue} />}
            {loading && <Loader />}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {/* Add Product Button */}
                <div className="flex justify-end mb-8">
                    <button 
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                        onClick={() => ChangeFormValue()}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Agregar Producto</span>
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {products?.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <ProductoModel 
                                name={product.name} 
                                price={product.price} 
                                productId={product.id} 
                            />
                            <div className="p-4 border-t border-gray-100">
                                <button 
                                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                                    onClick={() => removeProductData(product.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products?.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No hay productos</h3>
                        <p className="mt-1 text-sm text-gray-500">Comienza agregando tu primer producto</p>
                        <div className="mt-6">
                            <button
                                onClick={() => ChangeFormValue()}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                                Nuevo Producto
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products