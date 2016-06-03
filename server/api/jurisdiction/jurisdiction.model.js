'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('Jurisdiction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        county: DataTypes.STRING,
        laneMiles: DataTypes.STRING,
        centerLineMiles: DataTypes.STRING,
        lastAwardRound: DataTypes.STRING,
        lastInspection: DataTypes.STRING,
        street: DataTypes.STRING,
        street2: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING
    });
}
