export interface DashboardLayoutProps {
    current: string
    link: string
    linkName: string
    secondLink: string
    secondLinkName: string
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

interface ClientInsertInterface {
    name: string,
    credit: number
}

interface ClientModelProps {
    name: string
    credit: number
    clientId: number
    handleRemove: (id: number) => void
}

interface PropsForms {
    onClose: () => void
}

interface Order {
    id: number
    date: string
    clientId: number
    productLines: ProductLine[]
    totalOrderPrice: number
}
interface OrderInsertInterface {
    date: string
    clientId: number
}
interface OrderModelProps {
    date: string
    clientId: number
    productLines: ProductLine[]
    totalOrderPrice: number
    orderId?: number
    DeleteLineProduct?: (id: number) => void
    DeleteOrder?: (id: number) => void
}
interface ProductLine {
    id: number
    productId: number
    productName: string
    discountId: number
    discountValue: number
    quantity: number
    originalPrice: number
    finalPrice: number
    totalPrice: number
    product: Product
    discount?: Discount
}

interface OrderLineInsertInterface {
    productId: number
    quantity: number
}
interface OrderLine {
    orderId: number
    productId: number
    quantity: number
}
interface Discount {
    id: number
    ValidFrom: string
    ValidTo: string
    Value: number
    isPercent: boolean
}