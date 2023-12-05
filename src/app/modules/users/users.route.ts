import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router();

// Retrieve a list of all users
router.get('/', userControllers.getAllUsers);

// Create a new user
router.post('/', userControllers.createUser);

router
  .route('/:userId')
  .get(userControllers.getSingleUsers)
  .put(userControllers.updateSingleUser)
  .delete(userControllers.deleteSingleUser);

// create and get orders
router
  .route('/:userId/orders')
  .put(userControllers.createOrder)
  .get(userControllers.getOrders);

// Calculate price
router.get('/:userId/orders/total-price', userControllers.getOrderTotalPrice);

export const userRoutes = router;
