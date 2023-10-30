import Room from '../models/on-call/room.model.js';
import sequelize from '../config/sequelize.js';

class RoomService {
    /**
     * Creates a new room in the database.
     * @param {Object} data - The room data including number, type, capacity, price, and amenities.
     * @returns {Promise<Object>} - The created room object.
     * @throws {Error} - Throws an error if the room already exists or if there's an error during creation.
     */
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
    /**
     * Retrieves a room by its ID.
     * @param {number} id - The ID of the room to retrieve.
     * @returns {Promise<Object>} - The room object if found.
     * @throws {Error} - Throws an error if the room is not found.
     */

    async getById(id) {
        const room = await Room.findOne({
            where: { id }
        });
        if (!room) {
            throw new Error('Room not found');
        }
        return room;
    }
     /**
     * Updates a room's information.
     * @param {number} id - The ID of the room to update.
     * @param {Object} data - The updated room data.
     * @returns {Promise<Object>} - The updated room object.
     * @throws {Error} - Throws an error if the room is not found or if there's an error during update.
     */

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
     /**
     * Deletes a room by its ID.
     * @param {number} id - The ID of the room to delete.
     * @returns {Promise<Object>} - The deleted room object.
     * @throws {Error} - Throws an error if the room is not found or if there's an error during deletion.
     */

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
    /**
     * Retrieves a list of rooms with optional pagination parameters.
     * @param {Object} params - Optional parameters for pagination (offset, limit).
     * @returns {Promise<Array>} - An array of room objects.
     */

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
