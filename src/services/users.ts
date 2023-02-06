import userDao from "../models/users";
import CryptoJS from "crypto-js";
import { CheckDataDTO, CreateDataDTO, UpdateDataDTO } from "../dto/userDTO";
import { NotFoundException } from "../middlewares/exceptions"



const key: any = process.env.KEY

const getFortuneIdByName = (fortune: string | undefined) => {
  let fortuneId: number;
  
  switch (fortune) {
    case "love" : return fortuneId = 1
    case "money" : return fortuneId = 2
    case "relationship" : return fortuneId = 3
    case "ego" : return fortuneId = 4
    case "health" : return fortuneId = 5
  }
}


const checkEmail = async (data: CheckDataDTO) => {
  let result: { idx: number; res: string | boolean } = { idx: 0, res: "" }
  
  const emailList = await userDao.getEmails();
  emailList.map((el) => { 
    const decryptEmail = CryptoJS.AES.decrypt(el.email, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8)
    
    if(decryptEmail === data.email) { 
      result.idx = el.id;
      result.res = true; }
  })
  
  return result;
}

const createUserInfo = async (data: CreateDataDTO) => {
  const fortuneId = getFortuneIdByName(data.fortune_id)
  if(fortuneId !== undefined) { data.fortune_id = fortuneId.toString(); }
  
  const foundUser = await checkEmail(data);
  if(foundUser.res) { 
    await userDao.updateGoals(foundUser.idx, data);
  }
  else if(!foundUser.res) {
    const encryptEmail = CryptoJS.AES.encrypt(data.email, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }).toString()
    
    data.email = encryptEmail;
    await userDao.createUser(data);
  }
}

const updateUserImage = async (data: UpdateDataDTO) => {
  const foundUser = await checkEmail(data)

  if(foundUser.res) { 
    await userDao.updateUserImage(foundUser.idx, data);
  }
  else if(!foundUser.res) { throw new NotFoundException("User_Not_Found"); }
}



export default {
  checkEmail,
  createUserInfo,
  updateUserImage
}