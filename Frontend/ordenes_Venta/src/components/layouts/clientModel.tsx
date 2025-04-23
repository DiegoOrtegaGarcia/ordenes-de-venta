import { ClientModelProps } from "@/lib/types/types";

const ClientModel = ({ name, credit, clientId, handleRemove }: ClientModelProps) => {
  return (
    <a 
      href={`/ordenes/${clientId}`}
      className="group relative w-full bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-200"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-lg font-medium text-blue-600">
            Crédito: <span className="font-bold">€{credit?.toFixed(2)}</span>
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRemove(clientId);
          }}
          className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
          title="Eliminar cliente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </a>
  )
}

export default ClientModel;