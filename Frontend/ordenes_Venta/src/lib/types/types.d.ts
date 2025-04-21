export interface DashboardLayoutProps {
    current: string
    link: string
    linkName: string
}
export interface Product {
    id: number
    name: string
    price: number
}
interface ProductoModelProps {
    name: string
    price: number
    productId: number
  }

  interface ProductInsertInterface {
    name: string,
    price: number
}

interface Client {
    id: number
    name: string
    credit: number
}

interface ClientModelProps {
    name: string
    credit: number
    clientId: number
    handleRemove: (id: number) => void
}