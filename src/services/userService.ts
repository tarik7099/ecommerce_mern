import userModel from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    return { data: "User already exists !" , statusCode : 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new userModel({ email, password:hashedPassword, firstName, lastName });
  await newUser.save();
  return {data :generateJwt({firstName, lastName , email}), statusCode : 200};
};

interface loginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorrect email or password!" , statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {data: generateJwt({email, firstName: findUser.firstName, lastName: findUser.lastName}), statusCode :200};
  }
  return { data: "Incorrect email or password!" , statusCode: 400 };
};




const generateJwt =  (data:any) => {
  return jwt.sign(data, '8WEKLj0gAF+drUDUz0Y1')

}