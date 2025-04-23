import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useOrdersLine from "@/hooks/clients/use-Orders-Line"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PropsForms } from "@/lib/types/types"

interface LineProductFormProps extends PropsForms {
    ordernId: number
}

const LineProductForm = ({ordernId,onClose}: React.ComponentProps<"div"> & LineProductFormProps) => {
    
    const{register,handleSubmit,errors,onSubmit,errorMesage,successMesage} = useOrdersLine()

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
                Nueva Línea de Producto
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit((data) => onSubmit(data, ordernId))} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">ID del Producto</Label>
                    <Input
                      type="number"
                      {...register("productId", {valueAsNumber: true})}
                      placeholder="Ej: 12345"
                      className="mt-1 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.productId && (
                      <p className="mt-1 text-sm text-red-600">{errors.productId.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Cantidad</Label>
                    <Input
                      type="number"
                      {...register("quantity", {valueAsNumber: true})}
                      placeholder="Ej: 5"
                      className="mt-1 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                    )}
                  </div>
                </div>
    
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Agregar Producto
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


export default LineProductForm