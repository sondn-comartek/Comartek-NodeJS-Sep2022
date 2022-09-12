import userModel from "../databases/models/user.model.js";
import { errors, env } from "../utils/constants.js";

const getUsers = async () => {
  try {
    return await userModel.find({}).lean()
  } catch (err) {
    throw err;
  }
};

const storeUser = async (user) => {
  if(!user || typeof user !== 'object' || user.constructor !== Object) throw new Error(errors.inputInvalid)
  try {
    return await userModel.create(user)
  } catch (err) {
    throw err;
  }
};

const updateUser = async ( currentUserData , newUserData ) => {
  if( !currentUserData
    || !newUserData
    || typeof newUserData !== 'object' 
    || typeof currentUserData !== 'object' 
    || currentUserData.constructor !== Object 
    || newUserData.constructor !== Object ) throw new Error(errors.inputInvalid)
    try {
    return await userModel.updateOne( {
      email : currentUserData.email
    } , newUserData )
  } catch (err) {
    throw err;
  }
};

const findUserByEmail = async (email) => {
  if(!email || typeof email !== 'string') throw new Error(errors.inputInvalid)
  try {
    let error = null;
    const user = await userModel.findOne({
      email : email
    }).lean()
    if (!user) error = errors.userNotFound;
    return { user, error };
  } catch (err) {
    throw err;
  }
};

export { getUsers, storeUser, updateUser, findUserByEmail };
