'use strict';
var express = require('express');
//Sendgrid

var sendgrid = require('sendgrid').SendGrid(process.env.SENDGRID_USER, process.env.SENDGRID_PWD);
var router = express.Router();


router.sendgrid = sendgrid;

module.exports = router;
