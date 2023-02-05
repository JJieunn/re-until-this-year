import { dataSource } from "../configs/typeorm.config"
import { ReturnDataDTO } from "../dto/userDTO";
import { Users } from "../entities/users.entity";



const getEmails = async (): Promise<ReturnDataDTO[]> => {
  return await dataSource.createQueryBuilder()
  .select(["id", "email"])
  .from(Users, "users")
  .getRawMany()
}



export default {
  getEmails
}