import { useState } from "react";

interface Props {
    isOpenModificar: boolean,
    setIsOpenModificar: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => void,
    productoId: number
}
interface body {
    nombre?: string,
    precio?: number
}

const ModalModificarProducto = ({ isOpenModificar, setIsOpenModificar, refetch, productoId }: Props) => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState<number | null>(null);

    if (!isOpenModificar) return null;

    const handleClose = () => {
        setIsOpenModificar(false);
        setNombre("");
        setPrecio(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body: body = {}
        if(nombre.length > 0) body.nombre = nombre
        if(precio !== null) body.precio = precio
        fetch("http://localhost:1234/ordenesVenta/productos/" + productoId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(body)
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Error en la creación del artículo");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data.message);
            handleClose();
            refetch();
        })
        .catch((error) => {
            console.log(error.message);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background-form w-2/5 flex items-center p-10 flex-col gap-4 rounded-2xl">            
                <h2 className="font-bold text-2xl text-white">Modificar Producto</h2>
                <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="p-0.5 rounded justify-evenly max-w-4xl text-purple-strong font-bold text-2xl">Nombre</label>
                        <input className="bg-white rounded text-black" type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="p-0.5 rounded justify-evenly max-w-4xl text-purple-strong font-bold text-2xl">Precio</label>
                        <input className="bg-white rounded text-black" type="number" id="precio" name="precio" value={precio === null ? "" : precio} onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : null)} />
                    </div>
                    <button type="submit" className="text-black bg-purple-strong rounded p-1 w-3/6 font-bold text-1xl">Modificar</button>
                    <button type="button" className="text-black bg-purple-strong w-3/6 rounded p-1 font-bold text-1xl" onClick={handleClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalModificarProducto;