const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const groupController = require('../controllers/groups');
const passportConfig = require('../passport');

const passport = require('passport');

router.route('/addgroup')
    .post(validateBody(schemas.groupSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), groupController.addGroup);

router.route('/removegroup')
    .post(validateBody(schemas.removeGroupSchema), passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), groupController.removeGroup);

router.route('/getgroups')
    .get( passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), groupController.getGroups);


module.exports = router;