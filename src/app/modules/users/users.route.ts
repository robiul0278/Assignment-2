import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router();


// Create a new user
router.post('/create-users', userControllers.createUser);

// Retrieve a list of all users
router.get('/', userControllers.getAllUsers);

// Retrieve a specific user by ID
router.get('/:userId', userControllers.getSingleUsers);

// Update a specific user by ID
router.put('/:userId', userControllers.updateSingleUser);

// Delete a specific user by ID
router.delete('/:userId', userControllers.deleteSingleUser);

export const userRoutes = router;
 