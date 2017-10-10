'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('Contact', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        contactId: DataTypes.STRING,
        title: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        position: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING

    });
}
