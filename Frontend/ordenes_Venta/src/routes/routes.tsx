import App from '@/pages/products/App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Clients from '@/pages/clients/clients'



export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App></App>} />
                <Route path="/clients" element={<Clients />} />
            </Routes>
        </Router>
    )
}