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
        API_KEY: process.env.SENDGRID_API_KEY
    },
    // Seed database on startup
    seedDB: false

};