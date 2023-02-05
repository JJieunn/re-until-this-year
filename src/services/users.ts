import { CheckDataDTO } from "../dto/userDTO";
import userDao from "../models/users";
import CryptoJS from "crypto-js";


const key: any = process.env.KEY

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



export default {
  checkEmail
}