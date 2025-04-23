import { useEffect, useState } from 'react'
import { addClient, getClientsData, removeClient } from '@/helpers/clients/clientsData'
import { Client, ClientInsertInterface } from '@/lib/types/types'
import { setClient } from '@/lib/schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


const useClients = () => {
    
    const [clients, setClients] = useState<Client[]>()
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMesage, setErrorMesage] = useState("")
    const [successMesage, setSuccessMesage] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<ClientInsertInterface>({
        resolver: zodResolver(setClient),
      });

      const resetMessage = () => {
        setTimeout(() => {
            setErrorMesage("")
            setSuccessMesage("")
        }, 3000)
    }
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
    const setClientData = async (data: ClientInsertInterface) => {

        const response = await addClient(data)
        if (response.type === "error") {
            setErrorMesage(response.response)
        }
        else if (response.type === "success") {
            setSuccessMesage("Cliente creado")
            getClientsInfo()
        }
        setLoading(false)
        resetMessage()
    }
    const onSubmit = async (data: ClientInsertInterface) => {
        await setClientData(data)
    }

    const ChangeFormValue= () => {
        setShowForm(prev => !prev)
        getClientsInfo()
    }
    useEffect(() => {
        getClientsInfo()
    }, [])

    return {
        clients,
        removeClientData,
        register,
        handleSubmit,
        errors,
        onSubmit,
        loading,
        errorMesage,
        successMesage,
        showForm,
        ChangeFormValue
    }
}

export default useClients