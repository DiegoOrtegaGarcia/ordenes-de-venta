// OrdenesClient.tsx
import OrderModel from "@/components/layouts/orderModel"
import useOrders from "@/hooks/clients/use-Orders"
import Loader from "@/components/layouts/Loader"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LineProductForm from "@/components/layouts/forms/lineProductForm"
import useOrdersLine from "@/hooks/clients/use-Orders-Line"

const OrdenesClient = () => {
  const {id} = useParams()
  const {getOrdersClientInfo, ordersClient, loading, CreateOrder, DeleteOrder, errorMesageOrder, successMesageOrder} = useOrders()
  const {showForm, ChangeFormValue, loadingLine, errorMesage, successMesage, DeleteOrderLine} = useOrdersLine()
  const [orderId, setOrderId] = useState(0)

  const handleChange = (Orderid: number) => {
    setOrderId(Number(Orderid)) 
    ChangeFormValue()
  }

  useEffect(() => {
    getOrdersClientInfo(Number(id))
  }, [id, successMesage, errorMesage, showForm, errorMesageOrder, successMesageOrder])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/clients" className="mb-8 sticky top-0 bg-white py-4 z-10">Ir a Clientes</a>
      <div className="mb-8 sticky top-0 bg-white py-4 z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Órdenes del Cliente</h1>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => CreateOrder(Number(id))}
          >
            Nueva Orden
          </button>
        </div>
        
        {(errorMesage || successMesage) && (
          <div className="space-y-2 mb-4">
            {errorMesage.length > 1 && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-200">
                {errorMesage}
              </div>
            )}
            {successMesage.length > 1 && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg border border-green-200">
                {successMesage}
              </div>
            )}
          </div>
        )}
      </div>

      {(errorMesageOrder || successMesageOrder) && (
        <div className="space-y-2 mb-4">
          {errorMesageOrder.length > 1 && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-200">
              {errorMesageOrder}
            </div>
          )}
          {successMesageOrder.length > 1 && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg border border-green-200">
              {successMesageOrder}
            </div>
          )}
        </div>
      )}

      {(loading || loadingLine) && <Loader />}
      {showForm && <LineProductForm ordernId={orderId} onClose={ChangeFormValue} />}

      <div className="space-y-6">
        {ordersClient?.map((order) => (
          <div key={order.id} className="relative group">
          <OrderModel date={order.date} clientId={order.clientId} productLines={order.productLines} totalOrderPrice={order.totalOrderPrice} DeleteLineProduct={DeleteOrderLine} DeleteOrder={DeleteOrder} orderId={order.id} />
          <button 
            className="absolute bottom-0 right-0 bg-white shadow-sm text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors z-20"
            onClick={() => handleChange(order.id)}
          >
            + Producto
          </button>
        </div>
        ))}
      </div>
      
      {!ordersClient?.length && !loading && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron órdenes
        </div>
      )}
    </div>
  )
}

export default OrdenesClient