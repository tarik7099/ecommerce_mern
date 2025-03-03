import express, { request } from "express";
import { register } from "../services/userService";
import { login } from "../services/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  const { statusCode, data } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  response.status(statusCode).send(data);
});


router.post("/login", async (request, respone) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  respone.status(statusCode).send(data);
});

export default router;
