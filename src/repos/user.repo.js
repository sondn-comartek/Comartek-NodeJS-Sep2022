import path from "path";
import fs from "fs-extra";
import errors from "../utils/errors.js";

const __dirname = path.resolve();
const userStoragePath = __dirname + "/src/databases/user.json";

const getUsers = async () => {
    try {
      return await fs.readJSON(userStoragePath);
    } catch (err) {
      throw err;
    }
  };
  
  const storeUser = async (user) => {
    try {
      const users = await getUsers();
      users.push(user);
      return await fs.writeJson(userStoragePath, users);
    } catch (err) {
      throw err;
    }
  };
  
  const updateUser = async ( currUser, newUser ) => {
    try {
      const users = await getUsers();
      const index = users.findIndex((user) => user.email === currUser.email);
      users[index] = newUser;
      return await fs.writeJson(userStoragePath, users);
    } catch (err) {
      throw err;
    }
  };

  const findUserByEmail = async (email) => {
    try {
      let error = null
      const users = await getUsers();
      const user = users.filter( (user) => user.email === email)[0];
      if(!user) error = errors.userNotFound ;
      return { user , error } ;
    } catch(err) {
      throw err;
    }
  }

export { getUsers , storeUser , updateUser , findUserByEmail }