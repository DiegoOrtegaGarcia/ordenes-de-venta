import { Link } from "react-router-dom"
const Navbar = ()=>{
    return (
        <ul className="bg-nav-back w-full p-4 flex justify-between gap-2 h-max[1.5rem] rounded-2xl">
            <li><Link to="/login" className="text-2xl font-bold text-white m-1">Login</Link></li>
            <li><Link to="/" className="text-2xl font-bold text-white m-1">Productos</Link></li>
            <li><Link to="/clientPart" className="text-2xl font-bold text-white m-1">Clientes</Link></li>
        </ul>
    )
}
export default Navbar