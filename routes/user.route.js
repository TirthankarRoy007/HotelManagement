import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = new Router();

// Create a new user
router.post('/createUsers', userController.createUser);

// Get a specific user by ID
router.get('/getUsersById/:id', userController.getUserById);

// Update a specific user by ID
router.put('/updateUsers/:id', userController.updateUser);

// Delete a specific user by ID
router.delete('/deleteUsers/:id', userController.deleteUser);

// Get a list of users
router.get('/getAllUsers', userController.listUsers);

export default router;