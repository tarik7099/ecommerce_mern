
import express  from "express";
import productModel  from "../models/productModel";
import { getAllproducts } from "../services/productService";
const router = express.Router();


router.get('/', async (request, respone) => {
    const products = await getAllproducts();
    respone.status(200).send(products)
})

export default router;
