import express   from "express";
const router = express.Router();
import validatJwt from "../middlewares/ValidateJWT";
import { getActivieCardForUser } from "../services/cardServices";
import {ExtendRequest }from "../types/extendedRequest";
import {addItemToCart} from "../services/cardServices"


router.get("/", validatJwt,  async(req:ExtendRequest, res) => {
    const userId = req?.user?._id;

    const card = await getActivieCardForUser({ userId: userId})
    res.status(200).json(card);

    

});

router.post('/items', validatJwt, async (req:ExtendRequest, res)=> {
    const userId = req?.user?._id;
    const {productId , quantity} = req.body;
    const response = await addItemToCart({userId, productId , quantity})
    res.status(response.statusCode ?? 500).send(response.data);

})



export default router