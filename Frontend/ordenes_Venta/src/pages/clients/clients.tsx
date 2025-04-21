import { Client } from '@/lib/types/types'
import  DashboardLayout  from '../../components/layouts/dashboard'
import { useEffect, useState } from 'react'
import { getClientsData, removeClient } from '@/helpers/clients/clientsData'
import ClientModel from '@/components/layouts/clientModel'

const Clients = () => {
    const [clients, setClients] = useState<Client[]>()

    const getClientsInfo = async () => {
        const response = await getClientsData()
        if (response.type === "error") {
            console.log(response.response)
        }
        else {
            setClients(response.response)
        }
    }
    const removeClientData = async (id: number) => {
        const response = await removeClient(id)
        if (response.type === "error") {
            console.log(response.response)
        }
        else {
            getClientsInfo()
        }
    }
    useEffect(() => {
        getClientsInfo()
    }, [])
    return (
        <>
          <div className='felx flex-row items-center justify-center h-screen w-screen'>
            <DashboardLayout current={"Clientes"} link={""} linkName={"Productos"} />
            <div className='flex flex-row  justify-between items-center m-5'>
                <div className='flex flex-col gap-2 border-black border-2 p-2 rounded'>
                    {clients?.map((client) => (
                        <div key={client.id} className='flex flex-row gap-2 items-center w-full'>
                            <ClientModel name={client.name} credit={client.credit} clientId={client.id} handleRemove={removeClientData} />
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-2 border-black border-2 p-2 rounded'>
                    Ordenes
                </div>
            </div>
          </div>
        </>
      )
}

export default Clients