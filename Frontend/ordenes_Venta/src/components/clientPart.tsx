import { useState, useEffect } from "react";
import Navbar from "./navbar";
import Client from "./client";

interface ClienteInterface{
    id: number,
    nombre: string
}
interface OrdenInterface{
    id: number,
    cliente: number,
    producto: number,
    cantidad: number,
    precio: number
}

const ClientPart = ()=>{
    const endpoint = "http://localhost:1234/ordenesVenta/clientes"
    const [clientes,setClientes] = useState([])
    const [ordenes,setOrdenes] = useState([])

    const BuscarClientes = async ()=>{
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        setClientes(data);
    }

     const BuscarOrdenesCliente = async (e:React.MouseEvent<HTMLButtonElement>,idCliente:number)=>{
        e.preventDefault()
        console.log(idCliente)
        const response = await fetch("http://localhost:1234/ordenesVenta/ordenes/"+idCliente);
        if (!response.ok) {
            throw new Error('Error en la red');
        }

        const data = await response.json();
        console.log(data)
        setOrdenes(data);
    }

    useEffect(() => {
        BuscarClientes();
    }, []);
    return (
        <div className="bg-gray-900  flex items-center m-auto w-full h-screen p-4 mt-2 flex-col gap-4">
            <Navbar></Navbar>
            <div className="flex flex-col gap-4 w-full items-center">
                <h2 className="text-black text-2xl font-bold">Clientes</h2>
                <div className="flex flex-row gap-2 w-full justify-between ">
                
                    {clientes.length>0 ? (
                        <div className="flex flex-col gap-4 w-full items-start bg-white">
                            
                            <div className="flex flex-wrap flex-col w-full gap-4 items-start p-2">
                                <button className="bg-purple-strong rounded p-1 text-white" onClick={()=>console.log("hola")}>Agregar Cliente</button>
                                {clientes.map((cliente:ClienteInterface,index:number)=>{
                                    return(
                                        <div key={index} className="flex gap-4 w-full items-center justify-between border-2 border-black rounded p-1" onClick={(e)=>BuscarOrdenesCliente(e,cliente.id)}>
                                            <Client client={cliente}></Client>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ): null }
                    <div className="flex flex-col gap-4 w-9/12 items-center bg-white">
                        <h2>Ordenes</h2>
                        <div>
                            {ordenes && ordenes.length>0 ? (
                                <div className="flex flex-wrap flex-row gap-4 w-full items-center">
                                    {ordenes.map((orden:OrdenInterface)=>{
                                        return(
                                            <div key={orden.id} className="flex gap-4 w-52 items-center text-white">
                                                Pepe
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : null }
                        </div>
                    </div>   
                </div>  
            </div>
        </div>
    )
}

export default ClientPart 