import { CreateDataDTO } from "../dto/userDTO";
import { RegExpException } from "./exceptions";



export const regExpCheck = (data: CreateDataDTO) => {
  const nicknameRegExp = /^[0-9a-zA-Z-ㄱ-힣-\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ]{1,8}$/g;
  const emailRegExp =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  
  const nicknameResult = nicknameRegExp.test(data.nickname)
  const emailResult = emailRegExp.test(data.email)

  if( nicknameResult && emailResult ) { return true; }
  else { throw new RegExpException("RegExp_Error"); }
}