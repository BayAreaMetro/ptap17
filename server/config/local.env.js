'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'ptap-secret',
    // Control debug level for modules using visionmedia/debug
    DEBUG: '',
    NODE_ENV: 'development',
    SERVER: 'aa1tfsn5g37o9cz.c4ttzt2cz0de.us-west-2.rds.amazonaws.com',
    DATABASE: 'rtci-testing',
    SQL_USER: 'ksmith',
    SQL_PWD: 'GIS@mtc349',
    SEQUELIZE_URI: 'mssql://ksmith:GISatmtc101@aa17rb7oeu0tfn8.c4ttzt2cz0de.us-west-2.rds.amazonaws.com:1433/ptap-dev'
};
