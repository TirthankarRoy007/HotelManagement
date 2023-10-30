import Hotel from '../models/on-call/hotel.model.js';
import sequelize from '../config/sequelize.js';
import Room from '../models/on-call/room.model.js';
import Reservation from '../models/on-call/reservation.model.js';

class HotelService {
    /**
     * Creates a new hotel record in the database.
     * @param {Object} data - The data for creating the hotel.
     * @param {string} data.name - The name of the hotel.
     * @param {string} data.address - The address of the hotel.
     * @param {string} data.city - The city where the hotel is located.
     * @param {string} data.state - The state where the hotel is located.
     * @returns {Promise} A promise that resolves to the created hotel object.
     * @throws {Error} Throws an error if hotel creation fails.
     */
    async create(data) {
        const transaction = await sequelize.transaction();
        const {
            name,
            address,
            city,
            state
        } = data;
        try {
            const hotelExists = await Hotel.findOne({ where: { name } });
            
            if(hotelExists){
                console.log("Hotel already exists");
            }

            const hotel = await Hotel.create({
                name,
                address,
                city,
                state,
            }, {transaction});

            await transaction.commit();
            return hotel;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    /**
     * Retrieves a list of hotels from the database based on provided parameters.
     * @param {Object} params - The parameters for listing hotels.
     * @param {number} params.offset - The offset for paginating the results.
     * @param {number} params.limit - The maximum number of hotels to retrieve.
     * @returns {Promise} A promise that resolves to an array of hotels.
     */

    async list(params) {
        const {offset, limit} = params;
        const hotels = await Hotel.findAll({
            where: {},
            //include: [{model: Room}, {model: Reservation}],
            offset: offset, limit: limit
        });
        return hotels;
    }
    /**
     * Retrieves a specific hotel by its ID.
     * @param {number} id - The ID of the hotel to retrieve.
     * @returns {Promise} A promise that resolves to the retrieved hotel object.
     * @throws {Error} Throws an error if the hotel with the given ID is not found.
     */

    async getById(id) {
        const hotel = await Hotel.findOne({
            where: { id },
            //include: [{ model: Room }, { model: Reservation }]
        });
        if (!hotel) {
            throw new Error('Hotel not found');
        }
        return hotel;
    }
    /**
     * Updates an existing hotel record in the database.
     * @param {number} id - The ID of the hotel to update.
     * @param {Object} data - The data to update the hotel with.
     * @returns {Promise} A promise that resolves to the updated hotel object.
     * @throws {Error} Throws an error if the hotel with the given ID is not found or if the update fails.
     */

    async update(id, data) {
        const transaction = await sequelize.transaction();
        try {
            const hotel = await Hotel.findOne({ where: { id } });
            if (!hotel) {
                throw new Error('Hotel not found');
            }

            const updatedHotel = await hotel.update(data, { transaction });

            await transaction.commit();
            return updatedHotel;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    /**
     * Deletes a hotel record from the database.
     * @param {number} id - The ID of the hotel to delete.
     * @returns {Promise} A promise that resolves to the deleted hotel object.
     * @throws {Error} Throws an error if the hotel with the given ID is not found or if the deletion fails.
     */

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const hotel = await Hotel.findOne({ where: { id } });
            if (!hotel) {
                throw new Error('Hotel not found');
            }

            await hotel.destroy({ transaction });

            await transaction.commit();
            return hotel;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

export default new HotelService();
