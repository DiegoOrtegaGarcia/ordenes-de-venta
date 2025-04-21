import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ProductoModelProps } from "@/lib/types/types"

const ProductoModel = ({name,price,productId}:ProductoModelProps) => {
    const id = productId
    console.log(id)

    return (
        <Card className="flex flex-col items-center justify-center w-full h-fit">
            <CardHeader className="flex flex-row items-center justify-center w-full h-fit">
                <CardTitle className="text-xl font-bold">{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center justify-center w-full h-fit">
                <CardDescription className="text-xl font-bold">{price}</CardDescription>
            </CardContent>
        </Card>
    )

}

export default ProductoModel