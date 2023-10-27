import express from 'express';
import sequelize from './config/sequelize.js';
import hotelRoutes from './routes/hotel.route.js';
import roomRoutes from './routes/room.routes.js'
import reservationRoutes from './routes/reservation.routes.js'
import authenticationRoutes from './routes/authentication.route.js'
import userRoutes from './routes/user.route.js'

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sync Sequelize with the database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Unable to sync database:', err);
});

app.use('/api', hotelRoutes);
app.use('/api', roomRoutes);
app.use('/api', reservationRoutes)
app.use('/api', authenticationRoutes)
app.use('/api', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});