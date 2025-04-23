import DashboardLayout from "@/components/layouts/dashboard"
import OrderModel from "@/components/layouts/orderModel"
import useOrders from "@/hooks/clients/use-Orders"

const Ordenes = () => {
  const {orders} = useOrders()
  
  return (
    <>
    <DashboardLayout current={"Ordenes"} link={"clients"} linkName={"Clientes"} secondLink={"products"} secondLinkName={"Productos"} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Todas las Órdenes</h2>
            
            <div className="space-y-6">
            {orders?.map((order) => (
                <OrderModel 
                key={order.id}
                date={order.date} 
                clientId={order.clientId} 
                productLines={order.productLines} 
                totalOrderPrice={order.totalOrderPrice} 
                />
            ))}
            </div>
            
            {orders?.length === 0 && (
            <div className="text-center py-8 text-gray-400">
                No hay órdenes registradas
            </div>
            )}
        </div>
        </div>
    </>
  )
}

export default Ordenes