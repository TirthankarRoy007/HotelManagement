import { Router } from 'express';
import roomController from '../controllers/room.controller.js';

const router = new Router();

// Create a new room
router.post('/createRooms', roomController.create);

// Get a specific room by ID
router.get('/getRoomsById/:id', roomController.getById);

// Update a specific room by ID
router.put('/updateRooms/:id', roomController.update);

// Delete a specific room by ID
router.delete('/deleteRooms/:id', roomController.delete);

// Get a list of rooms
router.get('/getAllRooms', roomController.list);

export default router;
