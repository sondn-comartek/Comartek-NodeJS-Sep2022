'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        // Các thuộc tính của table
        ID_User: {
            type: DataTypes.BIGINT,
            primaryKey: true, // khóa chính
            autoIncrement: true, // tự tăng
            allowNull: false // cho phép bỏ trống
        },
        Username: { type: DataTypes.STRING, allowNull: false },
        Password: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: 'ADM_User',
        tableName: 'ADM_User',
        timestamps: false,
    });
    return User;
};