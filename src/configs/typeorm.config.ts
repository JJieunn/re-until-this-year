import { DataSource, TypeORMError } from "typeorm"
import { Fortunes } from "../entities/fortune.entity";
import { Goals } from "../entities/goals.entity";
import { Users } from "../entities/users.entity";


const dataSource = new DataSource ({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Fortunes, Users, Goals],
  synchronize: false,
  logging: false
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initailized!");
  })
  .catch((err: TypeORMError) => {
    console.log(err)
    console.log("Database initialize failed.");
  });

  export { dataSource }
