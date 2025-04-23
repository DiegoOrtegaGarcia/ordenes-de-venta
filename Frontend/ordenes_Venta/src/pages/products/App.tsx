import './App.css'
import  DashboardLayout  from '../../components/layouts/dashboard'
import Products from '../../components/products/products'

function App() {

  return (
    <>
      <div className='felx flex-row items-center justify-center h-screen w-screen'>
        <DashboardLayout current={"Productos"} link={"clients"} linkName={"Clientes"} secondLink={"ordenes"} secondLinkName={"Ordenes"} />
        <div>
          <Products />
        </div>
      </div>
    </>
  )
}

export default App
