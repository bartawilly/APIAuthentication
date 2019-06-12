const express = require('express');
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeshelpers');
const billController = require('../controllers/bills');
const passportConfig = require('../passport');

const passport = require('passport');


router.route('/newbill')
    .get(passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.newBill);
    
router.route('/previewbill')
    .post(validateBody(schemas.previewBillSchema),passport.authenticate('jwt',{failureRedirect: '/users/signin', session: false}), billController.previewBill);
module.exports = router;