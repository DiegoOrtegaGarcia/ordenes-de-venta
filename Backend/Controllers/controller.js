import { validateProduct,validatePartialProduct, validateClient } from "../Schemas/appSchemas.js";
// TODO: Manejo de errores

export class AppController{

    constructor({appModel}){
        this.appModel= appModel
    }

    //----Metodos para los clientes----

    getAllClients = async (req,res)=>{
        const clientes = await this.appModel.getAllClients()
        res.json(clientes)
    }

    getClientid = async (req,res)=>{
        const {id}= req.params
        const product = await this.appModel.getClientid({id})
        res.json(product)
    }
    setClient = async(req,res)=>{
        const objeto= validateClient(req.body)
        if(objeto.success){
            const {nombre}= objeto.data
            const result = await this.appModel.setClient({nombre})
            res.json(result)
        }
    }

    deleteClient = async (req,res)=>{
        const {id}= req.params
        const [client] = await this.appModel.getClientid({id})
       if(client=={message:"Client not found"}){
           res.status(404).json({message:"Client not found"})
        }
        const result = await this.appModel.deleteClient({id})
        res.status(200).json(result)
    }
    //----Metodos para los Descuentos----

    setDiscount = async (req,res)=>{
        const {value} = req.body

        const newDescuento= await this.appModel.setDiscount({value})
        res.status(201).json(newDescuento)
    }
    
    deleteDiscount = async (req,res)=>{
        const {id}= req.params
        
        const result = await this.appModel.deleteDiscount({id})
        res.status(200).json(result)
    }

    //----Metodos para las Ordenes----

    getAllOrders = async (req,res)=>{
        const orders=await this.appModel.getAllOrders()
        res.json(orders)
    }

    setOrder= async (req,res)=>{
        const {clientId,productoid,descuentoid} = req.params
        const {cantidad} = req.body
        const newOrder = await this.appModel.setOrder({clientId,productoid,descuentoid,cantidad})
        res.status(201).json(newOrder)
    }
    getOrdersClientid = async (req,res)=>{
        const {clientId} = req.params
        const orders = await this.appModel.getOrdersClientid({clientId})
        res.json(orders)
    }

    //----Metodos para los Productos----

    getProducts = async (req,res)=>{
        const productos = await this.appModel.getProducts()
        res.json(productos)
    }

    setProduct = async (req,res)=>{
        const product = validateProduct(req.body)
        if(product.success){
            const newProduct = await this.appModel.setProduct(product.data)
            res.status(201).json(newProduct)
        }
        else{
            res.status(400).json(product.error)
        }
    }
    getProductid = async (req,res)=>{
        const {id}= req.params
        const product = await this.appModel.getProductsid({id})
        res.json(product)
    }
    pathProduct = async (req,res)=>{
        const {id}= req.params
        const [product] = await this.appModel.getProductsid({id})
       if(product=={message:"Product not found"}){
           res.status(404).json({message:"Product not found"})
        }
        const objeto = validatePartialProduct(req.body)

        if(objeto.success){
            let nombreBoolean =false
            let precioBoolean =false

            if(objeto.data.nombre===undefined){
                nombreBoolean=true
            }
            if(objeto.data.precio===undefined){
                precioBoolean=true
            }
            const nombre = nombreBoolean ? product.nombre : objeto.data.nombre
            const precio = precioBoolean ? product.precio : objeto.data.precio

            const newProduct = await this.appModel.pathProduct({id,nombre,precio})
            res.status(200).json(newProduct)

        }
    }
    deleteProduct = async (req,res)=>{
        const {id}= req.params
        const [product] = await this.appModel.getProductsid({id})
       if(product=={message:"Product not found"}){
           res.status(404).json({message:"Product not found"})
        }
        const result = await this.appModel.deleteProduct({id})
        res.status(200).json(result)
    }

}