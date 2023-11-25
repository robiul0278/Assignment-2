import { userModel } from '../users.model';
import { Orders, User } from './users.interface';

// Create a new user
const createNewUserIntoDB = async (userData: User) => {
  const result = await userModel.create(userData);
  return result;
};

// Retrieve a list of all users
const getAllUsersIntoDB = async () => {
  const users = await userModel.aggregate([]).project({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return users;
};

// Retrieve a specific user by ID
const getSingleUserIntoDB = async (userId: number) => {
  const result = await userModel.findOne({ userId }).select('-password');
  return result;
};

// Update a specific user by ID
const updateSingleUserIntoDB = async (userId: number, updatedUserData: User,) => {
  const result = await userModel.findOneAndUpdate({ userId },
    {
      $set: updatedUserData,
    },
    { new: true},
  ).select({password: 0});
  return result;
};



// Delete a specific user by ID
const deleteUserIntoDB = async (userId: number) => {
  const result = await userModel.deleteOne({ userId });
  return result;
};

const createOrderIntoDB = async (userId: number, orderData: Orders) => {
  const result = await userModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { upsert: true, new: true },
  );
  return result;
};

export const userServices = {
  createNewUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  updateSingleUserIntoDB,
  deleteUserIntoDB,
  createOrderIntoDB
};
