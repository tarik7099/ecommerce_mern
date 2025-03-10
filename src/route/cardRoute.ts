import express   from "express";
const router = express.Router();
import validatJwt from "../middlewares/ValidateJWT";
import { getActivieCardForUser } from "../services/cardServices";


router.get("/", validatJwt,  async(req, res) => {
    const userId = (req as any).user._id;

    const card = await getActivieCardForUser({ userId: userId})
    res.status(200).json(card);

    
});
export default router