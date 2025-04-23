import { OrderModelProps } from "@/lib/types/types"
import { formatDate } from "@/utils/format/formatdate"

const OrderModel = ({date, clientId, productLines, totalOrderPrice, DeleteLineProduct, DeleteOrder, orderId}: OrderModelProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b pb-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600">{formatDate(date)}</p>
          <p className="text-lg font-medium text-blue-600">Cliente: #{clientId}</p>
        </div>
        
        <div className="flex items-center gap-4">
          {DeleteOrder && orderId && (
            <button 
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-1"
              onClick={() => DeleteOrder(orderId)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Eliminar Orden
            </button>
          )}
          
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">€{totalOrderPrice?.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {productLines?.map((productLine) => (
          <div key={productLine.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{productLine.productName}</p>
            <p className="text-sm text-gray-600">Desc: {productLine.discountValue || 0}%</p>
            <p className="text-sm">Cant: {productLine.quantity}</p>
            <div className="space-y-1">
              <p className="text-sm line-through text-gray-400">€{productLine.originalPrice}</p>
              <p className="text-sm font-medium text-green-600">€{productLine.finalPrice}</p>
            </div>
            <p className="text-sm font-medium">€{(productLine.totalPrice)?.toFixed(2)}</p>
            {DeleteLineProduct && (
              <button 
                className="bg-red-100 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors text-sm flex items-center gap-1"
                onClick={() => DeleteLineProduct(productLine.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderModel