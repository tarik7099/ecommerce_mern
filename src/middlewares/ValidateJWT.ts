import { Request, Response } from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import {ExtendRequest} from "../types/extendedRequest"


const validatJwt = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const autorizationHeader = req.get("authorization");
  if (!autorizationHeader) {
    res.status(403).send("authorization header was not provider");
    return;
  }

  const token = autorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("token no found");
    return;
  }
  jwt.verify(token, "8WEKLj0gAF+drUDUz0Y1", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    // fetc use from data pelyoad
    if (!payload) {
      res.status(403).send("Invalid token pelyoad");
      return;
    }
    const userPayload = payload as any;

    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validatJwt;
