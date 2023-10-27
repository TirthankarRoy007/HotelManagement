import { Router } from 'express';
import reservationController from '../controllers/reservation.controller.js';

const router = new Router();

// Create a new reservation
router.post('/createReservations', reservationController.create);

// Get a specific reservation by ID
router.get('/getReservationsById/:id', reservationController.getById);

// Update a specific reservation by ID
router.put('/updateReservations/:id', reservationController.update);

// Delete a specific reservation by ID
router.delete('/cancelReservations/:id', reservationController.delete);

// Get a list of reservations
router.get('/getAllReservations', reservationController.list);

export default router;
