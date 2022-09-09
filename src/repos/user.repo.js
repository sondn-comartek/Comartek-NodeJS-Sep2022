import path from "path";
import fs from "fs-extra";
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
  
  const updateUser = async (currUser, nextUser) => {
    try {
      const users = await getUsers();
      const index = users.findIndex((user) => user.email === currUser.email);
      users[index] = nextUser;
      return await fs.writeJson(userStoragePath, users);
    } catch (err) {
      throw err;
    }
  };
export { getUsers , storeUser , updateUser }