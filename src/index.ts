import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/userRoute";

const app = express();
const port = 3001;

app.use(express.json())

mongoose.connect("mongodb+srv://tkhadri6:4vQHsISYB8FZbZLn@ecommerce.n71hx.mongodb.net/ecommerce?retryWrites=true&w=majority", {
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));



app.use('/user', userRoute)




app.listen(port , ()=> {
  console.log(`server is running at : http://localhost:${port}`)

})