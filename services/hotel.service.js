import Hotel from '../models/on-call/hotel.model.js';
import sequelize from '../config/sequelize.js';
import Room from '../models/on-call/room.model.js';
import Reservation from '../models/on-call/reservation.model.js';

class HotelService {
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

    async list(params) {
        const {offset, limit} = params;
        const hotels = await Hotel.findAll({
            where: {},
            //include: [{model: Room}, {model: Reservation}],
            offset: offset, limit: limit
        });
        return hotels;
    }

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
