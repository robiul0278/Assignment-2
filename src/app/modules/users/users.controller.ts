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
    const  userId : any = req.params.userId;
    const result = await userServices.getSingleUserIntoDB(userId);

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
    const  userId : any = req.params.userId;
    const zodData = UserValidationSchema.parse(req.body);
    const result = await userServices.updateSingleUserIntoDB(
      userId,
      zodData,
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

// delete user 
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId : any = req.params.userId;
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

// Create order 
const createOrder = async (req: Request, res: Response) => {
  try {
    const  userId : any = req.params.userId;
    const user = await userServices.getSingleUserIntoDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const orderData = req.body;
    await userServices.createOrderIntoDB(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:'something went wrong',
      error,
    });
  }
};


// get order data 
const getOrders = async (req: Request, res: Response) => {
  try {
    const  userId : any = req.params.userId;
    const user = await userServices.getSingleUserIntoDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const { orders } = user.toObject();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      err,
    });
  }
};

// get total order price 
const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const  userId : any = req.params.userId;
    const user = await userServices.getSingleUserIntoDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    if (user.orders !== undefined && user.orders.length > 0) {
      let totalPrice = 0;

      user.orders.forEach((order) => {
        totalPrice += order.price * order.quantity;
      });

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User has no orders',
        data: {
          totalPrice: 0,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:'something went wrong',
      err,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateSingleUser,
  deleteSingleUser,
  createOrder,
  getOrders,
  getOrderTotalPrice
};
