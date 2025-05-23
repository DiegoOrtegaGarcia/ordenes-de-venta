import useProducts from "@/hooks/products/use-Products"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PropsForms } from "@/lib/types/types"


const ProductsForm = ({onClose}: React.ComponentProps<"div"> & PropsForms) => {
    
    const{register,handleSubmit,errors,onSubmit,errorMesage,successMesage} = useProducts()

    return (
        <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative animate-in fade-in-zoom duration-200">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full z-10 text-gray-500 hover:bg-gray-100"
              onClick={onClose}
            >
              <p className="h-5 w-5">X</p>
            </Button>
            
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Nuevo Producto
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Nombre del Producto</Label>
                    <Input
                      {...register("name")}
                      placeholder="Ej: Producto Premium"
                      className="mt-1 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Precio</Label>
                    <Input
                      type="number"
                      {...register("price", {valueAsNumber: true})}
                      placeholder="Ej: 99.99"
                      className="mt-1 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>
                </div>
    
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Crear Producto
                </Button>
    
                {errorMesage.length > 1 && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                    {errorMesage}
                  </div>
                )}
                
                {successMesage.length > 1 && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
                    {successMesage}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      )
}

export default ProductsForm