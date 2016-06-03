'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('Application', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        applicationId: DataTypes.STRING,
        jurisdictionId: DataTypes.STRING,
        primaryContactId: DataTypes.STRING,
        streetSaverContactId: DataTypes.STRING,
        // General Info
        attendTraining: DataTypes.STRING,
        lastUserMeeting: DataTypes.STRING,
        lastMajorInspection: DataTypes.STRING,
        pmsConsultants: DataTypes.STRING,
        linkedBaseMap: DataTypes.STRING,
        digitalMapFormat: DataTypes.STRING,
        // pavement management service project
        networkTotalPercentage: DataTypes.STRING,
        networkCenterLineMiles: DataTypes.STRING,
        networkMilesForSurvey: DataTypes.STRING,
        networkSurveyPercent: DataTypes.STRING,
        networkMilesRemaining: DataTypes.STRING,
        networkAdditionalFunds: DataTypes.STRING,
        networkPercentAdditionalFunds: DataTypes.STRING,
        arterials: DataTypes.STRING,
        residentials: DataTypes.STRING,
        collectors: DataTypes.STRING,
        other: DataTypes.STRING,
        otherDescription: DataTypes.STRING,
        // non pavement asset management project
        npamEstimatedcost: DataTypes.STRING,
        npamProjectdescription: DataTypes.STRING,
        streetLights: DataTypes.STRING,
        trafficSignals: DataTypes.STRING,
        sideWalks: DataTypes.STRING,
        gutters: DataTypes.STRING,
        curbs: DataTypes.STRING,
        stormDrains: DataTypes.STRING,
        signs: DataTypes.STRING,
        otherAsset: DataTypes.STRING,
        otherAssetDescription: DataTypes.STRING,
        // pavement design project
        pdpConstructionFullyFunded: DataTypes.STRING,
        pdpFederalAidEligible: DataTypes.STRING,
        pdpEstimatedCost: DataTypes.STRING,
        pdpAnticipatedConstructionDate: DataTypes.STRING,
        pdpProjectDescription: DataTypes.STRING,
        // Budget summary
        pmsGrantAmount: DataTypes.STRING,
        pmsLocalContribution: DataTypes.STRING,
        pmsAdditionalFunds: DataTypes.STRING,
        pmsTotalProjectCost: DataTypes.STRING,
        npamGrantAmount: DataTypes.STRING,
        npamTotalProjectCost: DataTypes.STRING,
        npamAdditionalFunds: DataTypes.STRING,
        npamLocalContribution: DataTypes.STRING,
        pdpGrantAmount: DataTypes.STRING,
        pdpTotalProjectCost: DataTypes.STRING,
        pdpAdditionalFunds: DataTypes.STRING,
        pdpLocalContribution: DataTypes.STRING,
        // signature
        publicWorksDirectorName: DataTypes.STRING,
        publicWorksDirectorTitle: DataTypes.STRING,
        publicWorksDirectorNumber: DataTypes.STRING,
        applicationdate: DataTypes.STRING
    });
}
