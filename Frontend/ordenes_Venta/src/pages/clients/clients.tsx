import useClients from '@/hooks/clients/use-Clients'
import DashboardLayout from '../../components/layouts/dashboard'
import ClientModel from '@/components/layouts/clientModel'
import ClientsForm from '@/components/layouts/forms/clientsForms'
import Loader from '@/components/layouts/Loader'

const Clients = () => {
  const { clients, removeClientData, ChangeFormValue, showForm, loading } = useClients()
    
  return (
    <>
    <DashboardLayout current={"Clientes"} link={"products"} linkName={"Productos"} secondLink={"ordenes"} secondLinkName={"Ordenes"} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <Loader />}
        {showForm && <ClientsForm onClose={ChangeFormValue} />}

        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
            <button 
              onClick={() => ChangeFormValue()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Nuevo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients?.map((client) => (
              <ClientModel 
                key={client.id}
                name={client.name}
                credit={client.credit}
                clientId={client.id}
                handleRemove={removeClientData}
              />
            ))}
          </div>

          {!clients?.length && !loading && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">No hay clientes registrados</p>
            </div>
          )}
        </div>
      </div> 
    </>
  )
}

export default Clients



