import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/userRoute";
import { seedInitailProducts } from "./services/productService";
import productRoute  from "./route/productRoute";

import cardRoute from "./route/cardRoute"
const app = express();
const port = 3005;

app.use(express.json())

mongoose.connect("mongodb+srv://tkhadri6:4vQHsISYB8FZbZLn@ecommerce.n71hx.mongodb.net/ecommerce?retryWrites=true&w=majority", {
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));



app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cardRoute)

seedInitailProducts()

app.listen(port , ()=> {
  console.log(`server is running at : http://localhost:${port}`)

})