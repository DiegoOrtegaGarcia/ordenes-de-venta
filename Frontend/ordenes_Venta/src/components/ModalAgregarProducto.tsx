import { useState } from "react";

interface Props {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => void
}

const ModalAgregarProducto = ({ isOpen, setIsOpen, refetch }: Props) => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:1234/ordenesVenta/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                nombre: nombre, 
                precio: precio 
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error en la creación del artículo");
            }
            return res.json();
        })
        .then(() => {
            handleClose();
            refetch();
        })
        .catch(() => {
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background-form w-2/5 flex items-center p-10 flex-col gap-4 rounded-2xl">            
                <h2 className="font-bold text-2xl text-white">Agregar Producto</h2>
                <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="p-0.5 rounded justify-evenly max-w-4xl text-purple-strong font-bold text-2xl">Nombre</label>
                        <input className="bg-white rounded text-black" type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="p-0.5 rounded justify-evenly max-w-4xl text-purple-strong font-bold text-2xl">Precio</label>
                        <input className="bg-white rounded text-black" type="number" id="precio" name="precio" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
                    </div>
                    <button type="submit" className="text-black bg-purple-strong rounded p-1 w-3/6 font-bold text-1xl">Agregar</button>
                    <button type="button" className="text-black bg-purple-strong w-3/6 rounded p-1 font-bold text-1xl" onClick={handleClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalAgregarProducto;