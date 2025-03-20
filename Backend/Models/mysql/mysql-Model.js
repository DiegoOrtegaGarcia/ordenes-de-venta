import mysql from "mysql2/promise"
// TODO: Manejo de errores

const config = {
    host: "localhost",
    user: "root",
    port: 3306,
    password:"Omega2005",
    database:"ordenes_venta"
}

const connection = await mysql.createConnection(config)

export class mysqlModel{

    //-----Querys Para Clientes-----

    static async getAllClients(){
        const [clients] = await connection.query("SELECT * FROM clientes")
        return clients
    }

    static async getClientid({id}){
        const [client]= await connection.query("SELECT * FROM clientes WHERE id=?",[id])
        if(!client){
            return {message:"Client not found"}
        }
        return client
    }

    static async setClient({nombre}){
        try{
            await connection.query("INSERT INTO clientes (nombre) VALUES (?);",[nombre])
            const [client] = await connection.query("SELECT * FROM clientes WHERE nombre=?",[nombre])
            return client
        }catch(e){
            return {message:"Error creating the client"}
        }
    }

    static async deleteClient({id}){
        try{
            await connection.query("DELETE FROM clientes WHERE id=?;",[id])
            return {message:"Client deleted"}
        }
        catch(e){
            if(e.code=== "ER_ROW_IS_REFERENCED_2"){return {message:"Client is referenced and Can't be deleted"}}
            throw new Error("Error delaiting the client")
        }
    }   

    //-----Querys Para Ordenes-----
    
    static async getAllOrders(){
        const [orders] = await connection.query("SELECT * FROM ordenes")
        return orders
    }

    static async setOrder({clientId,productoid,descuentoid,cantidad}){
        try{
            const [client]= await this.getClientid({id:clientId})
            if(!client){
                return {message:"Client not found"}
            }
            const [producto]= await this.getProductsid({id:productoid})
            if(!producto){
                return {message:"Product not found"}
            }
            const [descuento]= await this.getDiscountid({id:descuentoid})
            if(!descuento){
                return {message:"Discount not found"}
            }
            const price = producto.precio; 
            const discountAmount = (descuento.valor / 100) * price; 
            const finalPrice = (price - discountAmount) * cantidad;

            await connection.query("INSERT INTO ordenes (producto_id,cantidad,precioUnitario,precio_final,cliente_id,descuento_id) VALUES (?,?,?,?,?,?);",[producto.id,cantidad,price,finalPrice,client.id,descuento.id])
            const [orders] = await connection.query("SELECT * FROM ordenes WHERE producto_id=? AND cantidad=? AND precio_final=? AND cliente_id=? AND descuento_id=?",[producto.id,cantidad,price,finalPrice,client.id,descuento.id])
            return orders
        }
        catch(e){
            return {message:"Error creating the order"}
        }
    }
    static async getOrdersClientid({clientId}){
        const [orders] = await connection.query("SELECT * FROM ordenes  JOIN clientes ON ordenes.cliente_id=clientes.id WHERE clientes.id=?",[clientId])
        return orders
    }

    //-----Querys Para Productos-----
    
    static async getProducts(){
        const [productos]= await connection.query("SELECT * FROM productos")
        return productos
    }
    static async getProductsid({id}){
        const [producto]= await connection.query("SELECT * FROM productos WHERE id=?",[id])
        if(!producto){
            return {message:"Product not found"}
        }
        return producto
    }

    static async setProduct({nombre,precio}){
        try{
            await connection.query("INSERT INTO productos (nombre,precio) VALUES (?,?);",[nombre,precio])
            const [producto] = await connection.query("SELECT * FROM productos WHERE nombre=? AND precio=?",[nombre,precio])
            return producto
        }
        catch(e){
           return {message:"Error creating the product"}
        }
    }

    static async pathProduct({id,nombre,precio}){
        try{
            await connection.query("UPDATE productos SET nombre=?,precio=? WHERE id=?",[nombre,precio,id])
            const [producto] = await connection.query("SELECT * FROM productos WHERE id=?",[id])
            return producto
        }
        catch(e){
           return {message:"Error creating the product"}
        }
    }   
    
    static async deleteProduct({id}){
        try{
            await connection.query("DELETE FROM productos WHERE id=?;",[id])
            return {message:"Product deleted"}
        }
        catch(e){
            if(e.code=== "ER_ROW_IS_REFERENCED_2"){return {message:"Product is referenced and Can't be deleted"}}
            throw new Error("Error delaiting the product")
        }
    }   

    //-----Querys Para Descuentos-----

    static async setDiscount({value}){
        try{
            await connection.query("INSERT INTO descuentos (valor) VALUES (?);",[value])
            return true
        }
        catch(e){
            console.log(e)
        }
    }
    static async getDiscountid({id}){
        const [descuento]= await connection.query("SELECT * FROM descuentos WHERE id=?",[id])
        if(!descuento){
            return {message:"Discount not found"}
        }
        return descuento
    }

    static async deleteDiscount({id}){
        try{
            await connection.query("DELETE FROM descuentos WHERE id=?;",[id])
            return {message:"Discount deleted"}
        }
        catch(e){
            
            if(e.code=== "ER_ROW_IS_REFERENCED_2"){return {message:"Discount is referenced and Can't be deleted"}}

            throw new Error("Error delaiting the discount")
        }
    }
}