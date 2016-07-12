'use strict';

// Development specific configuration
// ==================================
module.exports = {

    // Sequelize connection opions
    sequelize: {
        uri: process.env.SEQUELIZE_URI,
        options: {
            logging: false,
            // storage: 'dev.sqlite',
            dialect: 'mssql',
            define: {
                timestamps: true
            }
        }
    },
    sendgrid: {
        user: process.env.SENDGRID_USER,
        pwd: process.env.SENDGRID_PWD
    },
    // Seed database on startup
    seedDB: false

};
