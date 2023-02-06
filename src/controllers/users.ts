import { Request, Response } from "express";
import { CheckDataDTO, CreateDataDTO, UpdateDataDTO } from "../dto/userDTO";
import { DuplicateException, EmptyException } from "../middlewares/exceptions";
import { regExpCheck } from "../middlewares/regexpCheck";
import userService from "../services/users";


const checkEmail = async (req: Request, res: Response) => {
  const data: CheckDataDTO = req.body;
  if(!data.email) { throw new EmptyException("Input_Error"); }

  const foundUser = await userService.checkEmail(data);
  if(foundUser.res) { throw new DuplicateException("Email_Exists"); }
  else { return res.status(200).json({ message: "Available" }); }
}

const createUserInfo = async (req: Request, res: Response) => {
  const data: CreateDataDTO = req.body;
  if(!(data.email && data.nickname && data.email && data.fortune_id && data.goals )) {
    throw new EmptyException("Input_Error"); }
  
  let regExpResult = regExpCheck(data);

  if(regExpResult) { 
    await userService.createUserInfo(data);
    return res.status(201).json({ message : "User_Created" }) }
}

const updateUserImage = async (req: Request, res: Response) => {
  const data: UpdateDataDTO = req.body;
  if(!(data.email && data.image)) { throw new EmptyException("Input_Error"); }

  await userService.updateUserImage(data);
  return res.status(200).json({ message : "Req_Success" })
}



export default {
  checkEmail,
  createUserInfo,
  updateUserImage
}