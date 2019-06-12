const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const usersController = require('../controllers/users');
const passportConfig = require('../passport');
const {JWTAdminAuthorization} = require('../helpers/authorization');

const passport = require('passport');

router.route('/signup')
    .post(validateBody(schemas.signupSchema), usersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.signinSchema),passport.authenticate('local-login', { failureRedirect: '/users/signin', failureFlash: true, session: false }),usersController.signIn);

router.route('/signin')
    .get(usersController.signInGet);

router.route('/signout')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}),usersController.signOut);

router.route('/secret')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), passport.authenticate('admin',{failureRedirect: '/panel/dashboard', session: false}),usersController.secret);

router.route('/edituser')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.editUser);
router.route('/updateuser')
    .post(validateBody(schemas.updateUser),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.updateUser);
router.route('/updateuserpassword')
    .post(validateBody(schemas.updateUserPassword),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.updateUserPassword);

router.route('/makeadmin')
    .post(validateBody(schemas.makeAdmin),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.makeAdmin);
    
router.route('/removeadmin')
    .post(validateBody(schemas.removeAdmin),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.removeAdmin);

router.route('/removeuser')
    .post(validateBody(schemas.removeUser),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), usersController.removeUser);
module.exports = router;