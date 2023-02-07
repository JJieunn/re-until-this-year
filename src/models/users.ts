import { dataSource } from "../configs/typeorm.config";
import { QueryRunner } from "typeorm";
import { CreateDataDTO, UpdateDataDTO, ReturnDataDTO } from "../dto/userDTO";
import { Users } from "../entities/users.entity";
import { Goals } from "../entities/goals.entity";
import { BadRequestException, EmptyException } from "../middlewares/exceptions";



const getEmails = async (): Promise<ReturnDataDTO[]> => {
  return await dataSource.createQueryBuilder()
  .select(["id", "email"])
  .from(Users, "users")
  .getRawMany()
}

const createUser = async (data: CreateDataDTO): Promise<void> => {
  if(data.goals.length < 0) { throw new EmptyException("Input_Error"); }
  if(data.goals.length > 5) { throw new BadRequestException(400, "Bad_Request"); }

  const queryRunner: QueryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    let values: string = ``
    const insertId = await insertUserInfo(data);
    data.goals.forEach((el, i) => {
      values += `(${insertId}, "${el}")`;
      if(i < data.goals.length-1) { values += ","; }
    })
    await insertGoals(values);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error("Internal Server Error");
  } finally {
    await queryRunner.release();
  }
}

const updateGoals = async (userId: number, data: UpdateDataDTO) => {
  if(data.goals.length < 0) { throw new EmptyException("Input_Error"); }
  if(data.goals.length > 5) { throw new BadRequestException(400, "Bad_Request"); }
  
  const queryRunner: QueryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await updateUserInfo(userId, data);
    await dataSource.createQueryBuilder()
    .delete()
    .from(Goals)
    .where("user_id = :userId", {userId})
    .execute()
    
    let values: string = ``
    
    data.goals.forEach((el, i) => {
      values += `(${userId}, "${el}")`;
      if(i < data.goals.length-1) { values += ","; }
    })
    await insertGoals(values);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error("Internal Server Error");
  } finally {
    await queryRunner.release();
  }
}


const insertUserInfo = async(data: CreateDataDTO): Promise<number> => {
  const result = await dataSource.createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      nickname: data.nickname,
      email: data.email,
      fortune_id: +data.fortune_id,
      opt_in: data.opt_in
    })
    .execute()

  return result.raw.insertId;
}

const updateUserInfo = async (userId: number, data: UpdateDataDTO) => {
  await dataSource.createQueryBuilder()
  .update(Users)
  .set({
    nickname: data.nickname,
    fortune_id: +data.fortune_id,
    opt_in: data.opt_in,
    image: data.image
  })
  .where("id = :userId", { userId })
  .execute()
}

const insertGoals = async (values: string) => {
  return await dataSource.query(`
      INSERT INTO goals(user_id, goal)
      VALUES ${values}
  `)
}



export default {
  getEmails,
  createUser,
  updateGoals
}