const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const reportController = require('../controllers/reports');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/report')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), reportController.getReports);




module.exports = router;