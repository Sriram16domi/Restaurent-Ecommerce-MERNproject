import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
     res.send("API WORKING")
})

//db Connection
connectDB()
//api endpoint
app.use("/api/food",foodRouter)
//access images from the uploads folder 
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.listen(port,()=>{
    console.log(`SERVER STARTED ON http://localhost:${port}`)
})
//mongodb+srv://sriram:SJ4Ll7LccDzBdWqT@cluster0.m0c9g.mongodb.net/?