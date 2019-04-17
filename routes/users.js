const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const usersController = require('../controllers/users');
const passportConfig = require('../passport');

const passport = require('passport');

router.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema),passport.authenticate('local',{session: false}),usersController.signIn);

router.route('/user-to-group')
    .post(validateBody(schemas.addUserGroupSchema), passport.authenticate('jwt',{session: false}), usersController.addUserToGroup);

router.route('/secret')
    .get(passport.authenticate('jwt',{session: false}), usersController.secret);

module.exports = router;