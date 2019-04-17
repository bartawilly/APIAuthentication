const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const groupController = require('../controllers/groups');
const passportConfig = require('../passport');

const passport = require('passport');

router.route('/addgroup')
    .post(validateBody(schemas.groupSchema), passport.authenticate('jwt',{session: false}), groupController.addGroup);


module.exports = router;