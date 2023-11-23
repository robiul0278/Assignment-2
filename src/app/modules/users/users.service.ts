import { userModel } from '../users.model';
import { User } from './users.interface';


// Create a new user
const createNewUserIntoDB = async (userData: User) => {
  const result = await userModel.create(userData);
  return result;
};


// Retrieve a list of all users
const getAllUsersIntoDB = async () => {
  const result = await userModel.find();
  return result;
};


// Retrieve a specific user by ID
const getSingleUserIntoDB = async (id: string) => {
  const result = await userModel.findOne({ id });
  return result;
};


// Update a specific user by ID
const updateSingleUserIntoDB = async (id: string, updatedUserData: User) => {
  const result = await userModel.findOneAndUpdate({ id }, updatedUserData, { new: true });
  return result;
};


// Delete a specific user by ID
const deleteSingleUserFromDB = async (id: string) => {
  const result = await userModel.findOneAndDelete({ id });
  return result;
};


export const userServices = {
  createNewUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB
};
