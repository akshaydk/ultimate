import { createConnection, getConnection, ConnectionNotFoundError } from "typeorm";
import defaultOrmConfig from "../db/ormconfig";

export const connect = async (req, res, next) => {
  try {
    await getConnection();
  } catch (e) {
    if ( e instanceof ConnectionNotFoundError){
      console.log('creating an mysql connection!!!')
      await createConnection(defaultOrmConfig);
    }
    else{
      console.log(e)
    }
  }

  next();
};

export const close = async (req, res, next) => {
  try {
    const connection = await getConnection();
    await connection.close();
    console.log('closing connection')
  } catch (e) {
    throw new Error(e);
  }

  next();
};
