import express, { json }from "express"
import { createRouter } from "../Routes/routes.js"

export const createApp = ({appModel})=>{
    const app = express()
    app.use(json())
    app.disable('x-powered-by')
    
    app.use('/ordenesVenta', createRouter({appModel}))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })

}