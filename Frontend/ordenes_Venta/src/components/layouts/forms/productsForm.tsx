import useProducts from "@/hooks/products/use-Products"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    onClose: () => void
}


const ProductsForm = ({onClose,className,...props}: React.ComponentProps<"div"> & Props) => {
    
    const{register,handleSubmit,errors,onSubmit,errorMesage,successMesage} = useProducts()

    return (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm">        
            <div className="fixed inset-0 flex   justify-center">
                <div className="w-full max-w-sm relative top-1/3 ">
                    <div className={cn("flex flex-col gap-6", className)} {...props}>
                        <Card>
                            <Button className="absolute -top-0 -right-0 bg-red-500 p-3 rounded-full z-10" onClick={()=>{onClose()}}>X</Button>
                            <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Create a new product</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Product Name</Label>
                                    <Input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    placeholder="Product Name"
                                    required
                                    />
                                    {errors.name && <Label className='text-red-500'>{errors.name.message}</Label>}
                                </div>
                                <div className="grid gap-3">
                                    <Input id="price" type="number" {...register("price",{valueAsNumber: true})} placeholder="Product Price" required />
                                    {errors.price && <Label className='text-red-500'>{errors.price.message}</Label>}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                    Create Product
                                    </Button>
                                </div>
                                {errorMesage.length > 1 && <div className="text-red-500 bg-red-900 p-2 rounded-md text-center text-md">{errorMesage}</div>}
                                {successMesage.length > 1 && <div className="text-green-500 bg-green-950 p-1.5 rounded-md text-center text-md">{successMesage}</div>}
                                </div>
                            </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default ProductsForm