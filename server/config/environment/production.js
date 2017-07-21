'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

    sequelize: {
        // uri: 'mssql://ksmith:GISatmtc349@ptap-db.c4ttzt2cz0de.us-west-2.rds.amazonaws.com:1433/ptap-dev',
        uri: process.env.SEQUELIZE_URI,
        options: {
            logging: false,
            dialect: 'mssql',
            // storage: 'dist.sqlite',
            define: {
                timestamps: true
            }
        }
    },
    sendgrid: {
        API_KEY: process.env.SENDGRID_API_KEY

    }
};