import { Request, Response } from "express";
import { CheckDataDTO } from "../dto/userDTO";
import { DuplicateException, EmptyException } from "../middlewares/exceptions";
import userService from "../services/users";


const checkEmail = async (req: Request, res: Response) => {
  const data: CheckDataDTO = req.body;
  if(!data.email) { throw new EmptyException("Input_Error"); }

  const foundUser = await userService.checkEmail(data);
  if(foundUser.res) { throw new DuplicateException("Email_Exists"); }
  else { return res.status(200).json({ message: "Available" }); }
}



export default {
  checkEmail
}