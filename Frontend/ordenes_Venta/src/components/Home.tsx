import { useEffect, useState } from "react"
import Navbar from "./navbar"
import ModalAgregarProducto from "./ModalAgregarProducto"
import ModalModificarProducto from "./ModalModificarProducto"

const endpoint = "http://localhost:1234/ordenesVenta/productos"

export interface ProductoInterface{ 
    id: number,
    nombre: string,
    precio: number,
}


const Home = ()=>{
    const [productos,setProductos] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    const [isModificarOpen,setIsModificarOpen] = useState(false)
    const [productoModificarId,setProductoModificarId] = useState(0)
    
    const BuscarProductos = async ()=>{
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        setProductos(data);
    }

    const handleDelete = (e:React.MouseEvent<HTMLButtonElement>,productoId:number)=>{
        e.preventDefault()
    
        fetch(endpoint+"/"+productoId,{
            method : "DELETE",
            headers :{
                "Content-Type": "application/json"
            },
            mode: "cors",
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Error en la eliminación del artículo");
            }
            return res.json();
        })
        .then((data) => {
            BuscarProductos()
            console.log(data.message);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    const handleModificar = (e:React.MouseEvent<HTMLButtonElement>,productoId:number)=>{
        e.preventDefault()
        setIsModificarOpen(true)
        setProductoModificarId(productoId)
    }

    useEffect(() => {
        BuscarProductos();
    }, []);

    return (
        <div className="bg-gray-900  flex items-center m-auto w-full h-screen p-4 mt-2 flex-col gap-4">
            <Navbar></Navbar>
            <div className="w-11/12">
                {productos.length>0 ? (
                <div className="flex flex-col gap-6 w-full items-center">
                    <button className="bg-purple-strong rounded p-1 text-white" onClick={()=>setIsOpen(true)}>Agregar Producto</button>
                    <div className="flex flex-wrap flex-row gap-4 w-full items-center">
                      {productos.map((producto:ProductoInterface)=>{
                        return(
                            <div key={producto.id} className="flex gap-4 w-52 items-center text-white">
                                <div className="flex flex-col gap-4 w-52 items-center text-black bg-white rounded-2xl p-1">
                                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                                        <p>{producto.nombre}</p>
                                        <p>Precio: {producto.precio}$</p>
                                    </div>
                                    <div className="flex flex-row gap-2 w-full justify-center items-center">
                                        <button className="bg-purple-strong rounded p-1 text-white" onClick={(e)=>handleDelete(e,producto.id)}>Delete</button>
                                        <button className="bg-purple-strong rounded p-1 text-white" onClick={(e)=>handleModificar(e,producto.id)}>Modificar</button>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                      })}
                    </div>
                </div>
                ): null }
            </div>
            <ModalAgregarProducto isOpen={isOpen} setIsOpen={setIsOpen} refetch={BuscarProductos}></ModalAgregarProducto>
            <ModalModificarProducto isOpenModificar={isModificarOpen} setIsOpenModificar={setIsModificarOpen} refetch={BuscarProductos} productoId={productoModificarId}></ModalModificarProducto>
        </div>
    )
}  
export default Home