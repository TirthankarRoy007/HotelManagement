import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Hotel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true,
});

Hotel.associate = function (models) {
    Hotel.hasMany(models.Room);
    Hotel.hasMany(models.Reservation);
};

export default Hotel;