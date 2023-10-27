import Reservation from '../models/on-call/reservation.model.js';
import sequelize from '../config/sequelize.js';

class ReservationService {
    async create(data) {
        const transaction = await sequelize.transaction();
        const { checkInDate, checkOutDate, totalAmount, RoomId, UserId } = data;

        try {
            const reservation = await Reservation.create({
                checkInDate,
                checkOutDate,
                totalAmount,
                RoomId,
                UserId
            }, { transaction });

            await transaction.commit();
            return reservation;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async getById(id) {
        const reservation = await Reservation.findOne({
            where: { id },
            //include: [{ model: Room }, { model: User }]
        });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        return reservation;
    }

    async update(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findOne({ where: { id } });
            if (!reservation) {
                throw new Error('Reservation not found');
            }

            const updatedReservation = await reservation.update(data, { transaction });

            await transaction.commit();
            return updatedReservation;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findOne({ where: { id } });
            if (!reservation) {
                throw new Error('Reservation not found');
            }

            await reservation.destroy({ transaction });

            await transaction.commit();
            return reservation;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async list(params) {
        const { offset, limit } = params;
        const reservations = await Reservation.findAll({
            where: {},
            //include: [{ model: Room }, { model: User }],
            offset: offset, limit: limit
        });
        return reservations;
    }
}

export default new ReservationService();
