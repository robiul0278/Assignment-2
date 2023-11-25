import { Request, Response } from 'express';
import { userServices } from './users.service';
import UserValidationSchema from './users.validation';



// Create User 
const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const zodData = UserValidationSchema.parse(userData);

    const result = await userServices.createNewUserIntoDB(zodData);
    res.status(201).json({
      success: true,
      message: 'User is create Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User Not Created!',
      error: error,
    });
  }
};


// get all user 
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersIntoDB();
    res.status(200).json({
      success: true,
      message: 'User get Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


// get single user 
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await userServices.getSingleUserIntoDB(studentId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Single student get Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


// update ingle user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { updatedUserData } = req.body;
    const result = await userServices.updateSingleUserIntoDB(
      userId,
      updatedUserData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserIntoDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateSingleUser,
  deleteSingleUser,
};
