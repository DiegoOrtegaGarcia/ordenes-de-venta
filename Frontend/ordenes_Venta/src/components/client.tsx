interface ClientInterface{
    id: number,
    nombre: string
}

const Client = ({client}:{client:ClientInterface})=>{
    return (
        <>
            <p className="text-black text-1xl font-bold">{client.nombre}</p>
            <button onClick={()=>console.log("hola")} className="bg-purple-strong rounded p-1 text-white">Agregar Orden</button>
        </>
    )
}

export default Client