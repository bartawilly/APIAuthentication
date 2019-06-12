const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const usersController = require('../controllers/users');
const passportConfig = require('../passport');
const panelController = require('../controllers/panel');
const {JWTAdminAuthorization} = require('../helpers/authorization');
const passport = require('passport');

router.route('/dashboard')
    .get(passport.authenticate('jwt',{session: false, failureRedirect: '/users/signin'}),
        panelController.dashboard
    );
module.exports = router;