const { Sequelize } = require('sequelize'); /* Có lỗi khi sử dụng sequelize */

const sequelize = new Sequelize('Comartek', 'sa', '123456', {
    /* dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
        server: 'ADMIN',
        port: 1433,
        options: {
            trustedconnection: true,
            enableArithAbort: true,
            encrypt: false,
            useUTC: false,
            dateFirst: 1
        }
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Cannot connect to the database', error);
    }
}

module.exports = connectDB, sequelize

