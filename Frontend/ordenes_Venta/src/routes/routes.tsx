import App from '@/pages/products/App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Clients from '@/pages/clients/clients'
import Ordenes from '@/pages/ordenes/ordenes'
import OrdenesClient from '@/pages/ordenes/ordenesClient'



export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<App></App>} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/ordenes" element={<Ordenes />} />
                <Route path="/ordenes/:id" element={<OrdenesClient />} />
            </Routes>
        </Router>
    )
}