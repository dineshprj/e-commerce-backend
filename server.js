import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use(
  cors({
    origin:[
      "https://e-commerce-website-sage-kappa.vercel.app",
      "https://e-commerce-admin-lilac-five.vercel.app"
    ]
  })
)

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

const start = async () => {
  try {
    await connectDB()
    await connectCloudinary()
    app.listen(port, () => {
      console.log("Server Started:", port)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()