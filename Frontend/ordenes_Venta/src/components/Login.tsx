import { Link } from "react-router-dom"

export const Login = ()=>{
    return (
        <div className="bg-background-form w-2/5 flex items-center m-auto p-10  flex-col gap-4 mt-32 rounded-2xl">
            <h2 className="font-bold text-2xl text-white">Login</h2>
            <form action="" className="flex flex-col gap-4 w-full items-center">
                <div className="flex flex-col gap-2 w-full items-center">
                    <label className="p-0.5 rounded justify-evenly max-w-4xl text-form-input font-bold text-2xl">Usuario</label>
                    <input className="bg-white rounded text-black" type="text" id="username" name="username" /> 
                </div>
                <div className="flex flex-col gap-2 w-full items-center">
                <label className="p-0.5 rounded justify-evenly max-w-4xl text-form-input font-bold text-2xl">Contraseña</label>
                <input className="bg-white rounded text-black" type="password" id="password" name="password" />
                </div>
                <button type="submit" className="text-black bg-form-input rounded p-1 w-3/6 text-2xl">Entrar</button>
                <li className="list-none"><Link to="/" className="p-1 text-black bg-form-input  w-3/6 tex-2xl rounded">Ir Directo a la Pagina</Link></li>
            </form>
        </div>
    )    
}