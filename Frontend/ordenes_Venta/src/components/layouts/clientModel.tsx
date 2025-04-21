import { ClientModelProps } from "@/lib/types/types";

const ClientModel = ({name,credit,clientId,handleRemove}:ClientModelProps) => {

    return (
        <div className="flex flex-row items-center justify-around lg:w-full h-fit border-black border-2 p-2 rounded gap-40">
            <p>Client Name: {name}</p>
            <p>Credit: {credit}</p>
            <button className="bg-red-500 text-white rounded-md p-2 hover:bg-red-700" onClick={() => handleRemove(clientId)}>Eliminar</button>
        </div>
    )
}

export default ClientModel