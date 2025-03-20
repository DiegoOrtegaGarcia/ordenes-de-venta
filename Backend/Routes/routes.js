import { Router } from "express";
import { AppController} from "../Controllers/controller.js";

export const createRouter=({appModel})=>{
    const appRouter = Router()

    const controller = new AppController({appModel})

    //---Metodos para los clientes---
    appRouter.get("/clientes",controller.getAllClients)
    appRouter.post("/clientes",controller.setClient)
    appRouter.delete("/clientes/:id",controller.deleteClient)

    //---Metodos para ordenes
    appRouter.get("/ordenes",controller.getAllOrders)
    appRouter.post("/ordenes/:clientId/:productoid/:descuentoid",controller.setOrder)
    appRouter.get("/ordenes/:clientId",controller.getOrdersClientid)

    //---Metodos para los productos---
    appRouter.get("/productos",controller.getProducts)
    appRouter.post("/productos",controller.setProduct)
    appRouter.get("/productos/:id",controller.getProductid)
    appRouter.patch("/productos/:id",controller.pathProduct)
    appRouter.delete("/productos/:id",controller.deleteProduct)

    //---Metodos para los descuentos---
    appRouter.post("/descuentos",controller.setDiscount)
    appRouter.delete("/descuentos/:id",controller.deleteDiscount)

    return appRouter
}