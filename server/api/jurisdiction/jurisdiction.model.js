'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('Jurisdiction', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        jurisdictionId: DataTypes.STRING,
        county: DataTypes.STRING,
        jurisdiction: DataTypes.STRING,
        lastMajorInspection: DataTypes.DATE,
        ptapCycle: DataTypes.STRING,
        certificationExpiration: DataTypes.DATE,
        company: DataTypes.STRING,
        centerLineMiles: DataTypes.STRING,
        laneMiles: DataTypes.STRING,
        sections: DataTypes.STRING,
        inspections: DataTypes.STRING,
        street: DataTypes.STRING,
        street2: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING
    });
}
