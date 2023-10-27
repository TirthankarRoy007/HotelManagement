import Room from '../models/on-call/room.model.js';
import sequelize from '../config/sequelize.js';

class RoomService {
    async create(data) {
        const transaction = await sequelize.transaction();
        const { number, type, capacity, price, amenities } = data;
        try {
            const roomExists = await Room.findOne({ where: { number } });

            if (roomExists) {
               console.log('Room already exists for this hotel');
            }

            const room = await Room.create({
                number,
                type,
                capacity,
                price,
                amenities
            }, { transaction });

            await transaction.commit();
            return room;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async getById(id) {
        const room = await Room.findOne({
            where: { id }
        });
        if (!room) {
            throw new Error('Room not found');
        }
        return room;
    }

    async update(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const room = await Room.findOne({ where: { id } });
            if (!room) {
                throw new Error('Room not found');
            }

            const updatedRoom = await room.update(data, { transaction });

            await transaction.commit();
            return updatedRoom;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const room = await Room.findOne({ where: { id } });
            if (!room) {
                throw new Error('Room not found');
            }

            await room.destroy({ transaction });

            await transaction.commit();
            return room;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    async list(params) {
        const { offset, limit } = params;
        const rooms = await Room.findAll({
            where: {},
            offset: offset, limit: limit
        });
        return rooms;
    }
}

export default new RoomService();
