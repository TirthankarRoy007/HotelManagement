import { Router } from 'express';
import hotelController from '../controllers/hotel.controller.js';

const router = new Router();

// Create a new hotel
router.post('/hotels', hotelController.create);

// Get a specific hotel by ID
router.get('/getHotelsById/:id', hotelController.getById);

// Update a specific hotel by ID
router.put('/updateHotels/:id', hotelController.update);

// Delete a specific hotel by ID
router.delete('/deleteHotels/:id', hotelController.delete);

// Get a list of hotels
router.get('/getAllHotels', hotelController.list);

export default router;
